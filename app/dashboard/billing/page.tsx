"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import moment from "moment";
import Script from "next/script";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";

function Billing() {
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { totalUsage } = useContext(TotalUsageContext);

  // Define maximum words based on subscription
  const maxWords = userSubscription ? 100000 : 10000;

  // Handle subscription creation
  const CreateSubscription = () => {
    setloading(true);
    axios.post("/api/create-subscription", {}).then(
      (res) => {
        OnPayment(res.data.id);
      },
      (error) => {
        setloading(false);
        console.error("Error creating subscription:", error);
      }
    );
  };

  // Handle payment processing with Razorpay
  const OnPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Content Generator",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp?.razorpay_payment_id) {
          await SaveSubscription(resp.razorpay_payment_id);
        }
        setloading(false);
      },
    };
    // @ts-ignore
    const rzp = new Razorpay(options);
    rzp.open();
  };

  // Save subscription to database
  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });
    if (result) {
      window.location.reload(); // Refresh to update subscription status
    }
  };

  // Determine usage message
  let usageMessage = "";
  if (!userSubscription && totalUsage >= 10000) {
    usageMessage =
      "You have exceeded your free plan limit of 10,000 words. Please upgrade to the monthly plan to continue generating content.";
  } else if (userSubscription && totalUsage >= 100000) {
    usageMessage =
      "You have exceeded your monthly limit of 100,000 words. Please wait until your next billing cycle or contact support for additional options.";
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <h2 className="text-3xl font-semibold text-center mb-6">
        Upgrade With Monthly Plan
      </h2>

      {/* Display current usage */}
      <div className="text-center text-gray-600 mb-4">
        Current Usage: {totalUsage.toLocaleString()} /{" "}
        {maxWords.toLocaleString()} words
      </div>

      {/* Display warning message if limit exceeded */}
      {usageMessage && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md mb-6">
          <p>{usageMessage}</p>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan Card */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center border">
          <h3 className="text-xl font-bold">Free</h3>
          <p className="text-3xl font-bold">
            ₹0 <span className="text-sm">/month</span>
          </p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✅ 10,000 Words/Month</li>
            <li>✅ 50+ Content Templates</li>
            <li>✅ Unlimited Download & Copy</li>
            <li>✅ 1 Month of History</li>
          </ul>
          <button className="mt-6 w-full py-2 bg-gray-600 text-white font-bold rounded-md cursor-not-allowed">
            Currently Active Plan
          </button>
        </div>

        {/* Monthly Plan Card */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center border border-purple-500">
          <h3 className="text-xl font-bold">Monthly</h3>
          <p className="text-3xl font-bold text-purple-700">
            ₹199 <span className="text-sm">/month</span>
          </p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✅ 1,00,000 Words/Month</li>
            <li>✅ 50+ Template Access</li>
            <li>✅ Unlimited Download & Copy</li>
            <li>✅ 1 Year of History</li>
          </ul>
          <Button
            disabled={loading || userSubscription}
            onClick={CreateSubscription}
            className="mt-6 w-full font-bold"
          >
            {loading && <Loader2Icon className="animate-spin mr-2" />}
            {userSubscription ? "Active Plan" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
