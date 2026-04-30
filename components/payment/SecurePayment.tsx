"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Zap, Shield, CheckCircle2 } from "lucide-react";

interface SecurePaymentProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function SecurePayment({ onSuccess, onError }: SecurePaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';
  const displayPrice = isAdmin ? 1 : 99; // ₹1 for admin, ₹99 for users
  const wordCredits = isAdmin ? 10000 : 100000; // 10k for admin, 100k for users
  
  // Format credits consistently to avoid hydration mismatch
  const formattedCredits = wordCredits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Inline Razorpay loading function
  const loadRazorpay = (): Promise<any> => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if ((window as any).Razorpay) {
        resolve((window as any).Razorpay);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        resolve((window as any).Razorpay);
      };
      script.onerror = () => {
        resolve(null);
      };
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Check if user is logged in
    if (!user?.primaryEmailAddress?.emailAddress) {
      alert("Please login to continue with payment");
      return;
    }

    console.log('💳 Starting payment process for:', user.primaryEmailAddress.emailAddress);
    console.log('💰 Amount:', displayPrice, '₹');
    console.log('👑 Is Admin:', isAdmin);

    setIsLoading(true);

    try {
      // Step 1: Load Razorpay
      let Razorpay = await loadRazorpay();
      
      // Fallback: Try to load Razorpay directly
      if (!Razorpay && !(window as any).Razorpay) {
        // Load script synchronously as fallback
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
        
        Razorpay = (window as any).Razorpay;
      }
      
      if (!Razorpay) {
        throw new Error("Failed to load Razorpay. Please refresh the page and try again.");
      }

      // Step 2: Create FIXED amount order from backend
      const response = await fetch("/api/payment-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      });

      const orderData = await response.json();

      console.log('📦 Order creation response:', orderData);

      if (!orderData.success) {
        console.error('❌ Order creation failed:', orderData);
        alert("Payment initialization failed: " + (orderData.error || "Unknown error"));
        throw new Error(orderData.error || "Payment initialization failed");
      }

      
      // Step 3: Open Razorpay with FIXED amount
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!razorpayKey) {
        throw new Error("Razorpay key not configured");
      }

      const options = {
        key: razorpayKey,
        amount: orderData.data.amount, // FIXED: ₹9900 (99 rupees)
        currency: orderData.data.currency,
        name: "RapidContent",
        description: `Premium Plan - ₹${displayPrice} once`, // FIXED: Show Premium Plan
        order_id: orderData.data.order_id,
        prefill: {
          name: user.fullName || user.firstName || "User",
          email: user.primaryEmailAddress.emailAddress,
          contact: user.phoneNumbers?.[0]?.phoneNumber || "",
        },
        notes: orderData.data.notes,
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          },
          escape: false,
          handleback: false,
          confirm_close: true,
          animation: "slideFromBottom",
        },
        handler: async function(response: any) {
          // Step 4: Verify payment on backend
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              expected_amount: orderData.data.amount, // Dynamic verification
            }),
          });

          const verifyResult = await verifyResponse.json();

          if (verifyResult.success) {
            // Step 5: Activate subscription
            await activateSubscription();
            alert("Payment successful! You now have lifetime premium access to all templates.");
            onSuccess?.();
          } else {
            alert("Payment verification failed. Please contact support.");
            onError?.({ message: "Payment verification failed" });
          }
          
          setIsLoading(false);
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('💥 Payment error:', error);
      
      let errorMessage = "Payment failed. Please try again.";
      let shouldRetry = false;
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Network error. Please check your internet connection and try again.";
          shouldRetry = true;
        } else if (error.message.includes('Razorpay') || error.message.includes('order creation')) {
          errorMessage = "Payment service temporarily unavailable. Please try again in a few minutes.";
          shouldRetry = true;
        } else if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
          errorMessage = "Authentication error. Please login again and try.";
        } else if (error.message.includes('amount') || error.message.includes('security')) {
          errorMessage = "Payment validation failed. Please refresh the page and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      // Show user-friendly error with retry option
      if (shouldRetry) {
        const retry = confirm(`${errorMessage}\n\nWould you like to try again?`);
        if (retry) {
          handlePayment(); // Retry payment
          return;
        }
      } else {
        alert(errorMessage);
      }
      
      // Log detailed error for debugging
      console.error('Payment error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        userEmail: user?.primaryEmailAddress?.emailAddress,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isOnline: navigator.onLine
      });
      
      onError?.(error);
      setIsLoading(false);
    }
  };

  const activateSubscription = async () => {
    try {
      const response = await fetch("/api/activate-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress, // Add user email
          plan: "Premium",
          amount: 99, // FIXED: ₹99
          paymentId: Date.now().toString(),
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to activate subscription");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {isAdmin ? 'Test Payment - ₹1' : `Buy Once - ₹${displayPrice} Lifetime`}
          </div>
        )}
      </Button>
      
      {/* Benefits Section */}
      <div className="space-y-2 text-xs text-gray-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>One-time payment: ₹{displayPrice} ({isAdmin ? 'testing' : 'lifetime'})</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>{formattedCredits} words credits included</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>All templates unlocked forever</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>No recurring charges</span>
        </div>
      </div>
    </div>
  );
}
