"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Zap, Shield, CheckCircle2 } from "lucide-react";

interface SimplePaymentProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  pricingInfo?: any;
}

export default function SimplePayment({ onSuccess, onError, pricingInfo }: SimplePaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';
  
  // Use pricing info from props or fallback to default
  const currency = pricingInfo?.currency || 'INR';
  const price = isAdmin ? 1 : (pricingInfo?.price || 99);
  const amount = isAdmin ? 100 : (currency === 'INR' ? price * 100 : price * 100);
  const displayPrice = isAdmin ? '₹1' : (pricingInfo?.displayPrice || '₹99');
  const wordCredits = isAdmin ? 10000 : 1000000; // 1M credits for premium
  const formattedWordCredits = isAdmin ? "10000" : "1000000"; // Simple string to avoid hydration
  
  // Load Razorpay
  const loadRazorpay = (): Promise<any> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve((window as any).Razorpay);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve((window as any).Razorpay);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      onError?.({ message: 'Please login to make payment' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payment-attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.primaryEmailAddress.emailAddress,
          currency: currency,
          paymentMethod: 'card'
        }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Load Razorpay
      const Razorpay = await loadRazorpay();
      
      // Open Razorpay checkout
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "RapidContent Generator",
        description: `${formattedWordCredits} Word Credits`,
        order_id: orderData.data.order_id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                expected_amount: amount
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              // Activate subscription
              const activateResponse = await fetch('/api/activate-subscription', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: user.primaryEmailAddress?.emailAddress || '',
                  plan: "Professional",
                  paymentId: response.razorpay_payment_id
                }),
              });

              const activateData = await activateResponse.json();
              
              if (activateData.success) {
                onSuccess?.();
              } else {
                throw new Error(activateData.error || 'Failed to activate subscription');
              }
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment processing error:', error);
            onError?.(error);
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          email: user.primaryEmailAddress?.emailAddress || '',
        },
        theme: {
          color: "#3B82F6",
        },
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Pay {displayPrice} - Get Premium
          </>
        )}
      </Button>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Shield className="w-4 h-4 text-green-400" />
          <span>Secure payment via Razorpay</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>Instant access to {formattedWordCredits} credits</span>
        </div>
      </div>
    </div>
  );
}
