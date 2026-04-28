"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Zap, Shield, CheckCircle2, Globe, CreditCard, Smartphone, Building } from "lucide-react";
import { 
  PAYMENT_CONFIG, 
  getCurrencyByLocation, 
  getLocalizedPrice, 
  formatPrice, 
  validatePaymentAmount,
  getAvailablePaymentMethods 
} from "@/lib/payment-config";

interface InternationalPaymentProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function InternationalPayment({ onSuccess, onError }: InternationalPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [retryCount, setRetryCount] = useState(0);
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';
  
  // Get localized pricing
  const basePrice = PAYMENT_CONFIG.razorpay.plans.professional.INR;
  const localizedPrice = isAdmin ? 1 : getLocalizedPrice(basePrice, selectedCurrency);
  const wordCredits = isAdmin ? 10000 : 100000;
  
  // Available payment methods for selected currency
  const availableMethods = getAvailablePaymentMethods(selectedCurrency);
  
  // Auto-detect user's currency
  useEffect(() => {
    const detectCurrency = async () => {
      const currency = await getCurrencyByLocation();
      setSelectedCurrency(currency);
      
      // Set default payment method based on currency
      if (currency === 'INR') {
        setSelectedMethod('upi'); // UPI is popular in India
      } else {
        setSelectedMethod('card'); // Card for international
      }
    };
    
    detectCurrency();
  }, []);
  
  // Load Razorpay
  const loadRazorpay = (): Promise<any> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve((window as any).Razorpay);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve((window as any).Razorpay);
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
    });
  };
  
  const handlePayment = async () => {
    // Check if user is logged in
    if (!user?.primaryEmailAddress?.emailAddress) {
      alert("Please login to continue with payment");
      return;
    }

    // Validate payment amount
    if (!validatePaymentAmount(localizedPrice, selectedCurrency)) {
      alert(`Invalid payment amount for ${selectedCurrency}`);
      return;
    }

    console.log('💳 Starting international payment:', {
      email: user.primaryEmailAddress.emailAddress,
      currency: selectedCurrency,
      amount: localizedPrice,
      method: selectedMethod,
      isAdmin
    });

    setIsLoading(true);

    try {
      // Load Razorpay
      let Razorpay = await loadRazorpay();
      
      if (!Razorpay && !(window as any).Razorpay) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
        
        Razorpay = (window as any).Razorpay;
      }
      
      if (!Razorpay) {
        throw new Error("Failed to load payment gateway. Please refresh the page and try again.");
      }

      // Create order
      const response = await fetch("/api/payment-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.primaryEmailAddress.emailAddress,
          currency: selectedCurrency,
          amount: localizedPrice,
          paymentMethod: selectedMethod,
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        console.error('❌ Order creation failed:', orderData);
        throw new Error(orderData.error || "Payment initialization failed");
      }

      // Open Razorpay checkout
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!razorpayKey) {
        throw new Error("Payment gateway not configured");
      }

      const options = {
        key: razorpayKey,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "RapidContent",
        description: `Professional Plan - ${formatPrice(localizedPrice, selectedCurrency)} once`,
        order_id: orderData.data.order_id,
        prefill: {
          name: user.fullName || user.firstName || "User",
          email: user.primaryEmailAddress.emailAddress,
          contact: user.phoneNumbers?.[0]?.phoneNumber || "",
        },
        notes: {
          ...orderData.data.notes,
          currency: selectedCurrency,
          payment_method: selectedMethod,
          localized_amount: localizedPrice,
        },
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
          // Verify payment
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              expected_amount: orderData.data.amount,
              currency: selectedCurrency,
            }),
          });

          const verifyResult = await verifyResponse.json();

          if (verifyResult.success) {
            // Activate subscription
            await activateSubscription();
            alert(PAYMENT_CONFIG.successMessages.payment);
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
      
      let errorMessage = PAYMENT_CONFIG.errorMessages.general;
      let shouldRetry = false;
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = PAYMENT_CONFIG.errorMessages.network;
          shouldRetry = true;
        } else if (error.message.includes('Razorpay') || error.message.includes('order creation')) {
          errorMessage = PAYMENT_CONFIG.errorMessages.service;
          shouldRetry = true;
        } else if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
          errorMessage = PAYMENT_CONFIG.errorMessages.authentication;
        } else if (error.message.includes('amount') || error.message.includes('security')) {
          errorMessage = PAYMENT_CONFIG.errorMessages.validation;
        } else {
          errorMessage = error.message;
        }
      }
      
      // Retry logic
      if (shouldRetry && retryCount < PAYMENT_CONFIG.retry.maxAttempts) {
        const retry = confirm(`${errorMessage}\n\nWould you like to try again? (${retryCount + 1}/${PAYMENT_CONFIG.retry.maxAttempts})`);
        if (retry) {
          setRetryCount(retryCount + 1);
          setTimeout(() => handlePayment(), PAYMENT_CONFIG.retry.delay * Math.pow(PAYMENT_CONFIG.retry.backoffMultiplier, retryCount));
          return;
        }
      } else {
        alert(errorMessage);
      }
      
      // Log detailed error
      console.error('Payment error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        userEmail: user?.primaryEmailAddress?.emailAddress,
        currency: selectedCurrency,
        amount: localizedPrice,
        method: selectedMethod,
        retryCount,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isOnline: navigator.onLine
      });
      
      onError?.(error);
      setIsLoading(false);
      setRetryCount(0);
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
          email: user?.primaryEmailAddress?.emailAddress,
          plan: "Professional",
          amount: localizedPrice,
          currency: selectedCurrency,
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

  // Get payment method icon
  const getMethodIcon = (methodId: string) => {
    const method = availableMethods.find(m => m.id === methodId);
    return method?.icon || '💳';
  };

  return (
    <div className="space-y-6">
      {/* Currency Selection */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <label className="block text-sm font-medium text-blue-100 mb-2">
          <Globe className="w-4 h-4 inline mr-2" />
          Select Currency
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(PAYMENT_CONFIG.razorpay.currencies).map(([code, config]) => (
            <button
              key={code}
              onClick={() => setSelectedCurrency(code)}
              className={`p-2 rounded-lg border transition-all ${
                selectedCurrency === code 
                  ? 'bg-white text-blue-600 border-white' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-lg font-bold">{config.symbol}</div>
              <div className="text-xs">{code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <label className="block text-sm font-medium text-blue-100 mb-2">
          <CreditCard className="w-4 h-4 inline mr-2" />
          Payment Method
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {availableMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-3 rounded-lg border transition-all ${
                selectedMethod === method.id 
                  ? 'bg-white text-blue-600 border-white' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{method.icon}</span>
                <span className="text-sm font-medium">{method.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-lg font-semibold">
              {isAdmin ? 'Test Payment' : `Pay ${formatPrice(localizedPrice, selectedCurrency)}`}
            </span>
            {!isAdmin && <span className="text-sm opacity-75">Lifetime Access</span>}
          </div>
        )}
      </Button>
      
      {/* Benefits Section */}
      <div className="space-y-2 text-xs text-blue-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>One-time payment: {formatPrice(localizedPrice, selectedCurrency)} ({isAdmin ? 'testing' : 'lifetime'})</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>{wordCredits.toLocaleString()} words credits included</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>All templates unlocked forever</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>Secure payment via Razorpay</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>International payment support</span>
        </div>
      </div>
    </div>
  );
}
