"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useContext } from "react";
import Script from "next/script";

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const { userSubscription } = useContext(UserSubscriptionContext);

  // Simple pricing plans for demo
  const pricingPlans = [
    {
      name: "Free",
      price: "Rs 0",
      words: 100000, // 1,00,000 words/month for better conversion
      features: ["1,00,000 Words/Month", "50+ templates", "Basic support", "1 month history"],
      popular: false,
      amount: 0
    },
    {
      name: "Professional",
      price: "Rs 99",
      words: 1000000, // Updated to 10,00,000 for demo
      features: ["10,00,000 words/month", "50+ templates", "Priority support", "1 year history", "Unlimited downloads"],
      popular: true,
      amount: 9900 // Rs 99 in paise
    }
  ];

  // Handle real payment using Razorpay official checkout
  const CreatePayment = async (amount: number, planName: string) => {
    setLoading(true);
    
    try {
      // Check if Razorpay is loaded
      if (typeof window === 'undefined' || !(window as any).Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      const Razorpay = (window as any).Razorpay;
      
      // Create Razorpay order first
      const orderResponse = await fetch('/api/create-payment-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Initialize Razorpay checkout
      const options = {
        key: 'rzp_test_SgXuW7KQksGctR', // Your test key
        amount: amount,
        currency: 'INR',
        name: 'AI Content Generator',
        description: `${planName} Plan - ₹${amount/100}/month`,
        order_id: orderData.id,
        prefill: {
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName || user?.firstName || 'User',
        },
        notes: {
          plan: planName,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
        handler: function (response: any) {
          // Payment successful - this will be handled by webhook
          console.log('Payment successful:', response);
          
          // Show processing message
          alert('Payment received! Activating your premium features...');
          
          // Redirect to dashboard - webhook will handle activation
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log('Payment modal dismissed');
          },
          escape: true,
          backdropclose: true,
          handleback: true,
          confirm_close: true,
          animation: 'fadeFromBottom',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      
    } catch (error) {
      setLoading(false);
      console.error("Error processing payment:", error);
      alert('Failed to process payment. Please try again.');
    }
  };

  // Note: Premium activation is now handled by webhook
  // No manual activation needed - webhook will verify payment and update database

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Choose Your Perfect Plan
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Unlock unlimited content creation with our affordable Indian pricing
        </p>

      {/* Current Status */}
      {userSubscription && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            🎉 You're on Professional Plan!
          </h3>
          <p className="text-green-600">
            Enjoy 10,00,000 words/month, priority support, and all premium features.
          </p>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan Card */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center border">
          <h3 className="text-xl font-bold">Free</h3>
          <p className="text-3xl font-bold">
            Rs 0 <span className="text-sm">/month</span>
          </p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>1,00,000 Words/Month</li>
            <li>50+ Content Templates</li>
            <li>Unlimited Download & Copy</li>
            <li>1 Month of History</li>
          </ul>
          <button className="mt-6 w-full py-2 bg-gray-600 text-white font-bold rounded-md cursor-not-allowed">
            {userSubscription ? "Your Previous Plan" : "Currently Active Plan"}
          </button>
        </div>

        {/* Professional Plan Card */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center border border-purple-500">
          <h3 className="text-xl font-bold">Professional</h3>
          <p className="text-3xl font-bold text-purple-700">
            Rs 99 <span className="text-sm">/month</span>
          </p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>10,00,000 Words/Month</li>
            <li>50+ Template Access</li>
            <li>Unlimited Download & Copy</li>
            <li>1 Year of History</li>
          </ul>
          {userSubscription ? (
            <button className="mt-6 w-full py-2 bg-green-600 text-white font-bold rounded-md cursor-not-allowed">
              🎉 Current Plan - Active
            </button>
          ) : (
            <Button
              disabled={loading}
              onClick={() => CreatePayment(9900, "Professional")}
              className="mt-6 w-full font-bold"
            >
              {loading && <Loader2Icon className="animate-spin mr-2" />}
              {loading ? "Processing Payment..." : "Upgrade to Professional - ₹99/month"}
            </Button>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {userSubscription ? "🎉 Enjoying premium features" : "🚀 Instant activation after payment"}
          </p>
        </div>
      </div>

      {/* Professional Notice */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">🚀 Professional SAAS Application</h3>
        <p className="text-green-600">
          {userSubscription 
            ? "Thank you for upgrading! You now have access to 10,00,000 words/month and all premium features."
            : "This is a fully functional SAAS application with real payment processing. Click 'Upgrade' to activate your Professional plan with 10,00,000 words/month."
          }
        </p>
      </div>
    </div>
    </>
  );
}

export default Billing;
