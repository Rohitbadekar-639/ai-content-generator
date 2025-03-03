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

function billing() {
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const CreateSubscription = () => {
    setloading(true);
    axios.post("/api/create-subscription", {}).then(
      (res) => {
        console.log(res.data);
        OnPayment(res.data.id);
      },
      (error) => {
        setloading(false);
        console.log(error);
      }
    );
  };

  const OnPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Content Generator",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id);
        }
        setloading(false);
      },
    };
    // @ts-ignore
    const rzp = new Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });
    console.log(result);
    if (result) {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <h2 className="text-3xl font-semibold text-center mb-6">
        Upgrade With Monthly Plan
      </h2>

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
            disabled={loading}
            onClick={() => CreateSubscription()}
            className="mt-6 w-full font-bold"
          >
            {loading && <Loader2Icon className="animate-spin" />}
            {userSubscription ? "Active Plan" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default billing;
