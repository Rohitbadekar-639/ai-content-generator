"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SecurePayment from "@/components/payment/SecurePayment";
import { Loader2Icon, CheckCircle2, Star, Zap } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useContext } from "react";

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const { userSubscription } = useContext(UserSubscriptionContext);

  
  // Refresh subscription status
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetch('/api/check-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.isSubscribed) {
          setUserSubscription(true);
        } else {
          setUserSubscription(false);
        }
      })
      .catch(error => {
        setUserSubscription(false);
      });
    }
  }, [user, setUserSubscription]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Get Premium Access</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div
            className="relative rounded-2xl p-8 bg-white shadow-xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <div className="text-4xl font-bold mb-2">
                ₹0
                <span className="text-lg font-normal"> forever</span>
              </div>
              <p className="text-gray-600">
                Limited access
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">limited templates only</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Basic features</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Limited access</span>
              </li>
            </ul>

            <Button disabled className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              Current Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div
            className="relative rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4" />
                BEST VALUE
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <div className="text-4xl font-bold mb-2">
                ₹99
                <span className="text-lg font-normal"> once</span>
              </div>
              <p className="text-blue-100">
                100,000 words credits
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white">100,000 words credits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white">All 50+ templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white">Full features</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white">Lifetime access</span>
              </li>
            </ul>
            {userSubscription ? (
              <Button disabled className="w-full bg-white text-blue-600">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Premium Active
              </Button>
            ) : (
              <SecurePayment
                onSuccess={() => {
                  // Refresh subscription status
                  window.location.reload();
                }}
                onError={(error) => {
                  // Payment error handled
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Instant Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
