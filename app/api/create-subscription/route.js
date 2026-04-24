// /api/create-subscription

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req, res) {
  try {
    const { planId, planName } = await req.json();
    
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    // Define pricing plans
    const plans = {
      "pro_plan": {
        amount: 1900, // $19 in rupees (adjust based on your currency)
        period: "monthly",
        description: "Pro Plan - 100,000 words/month"
      },
      "unlimited_plan": {
        amount: 4900, // $49 in rupees
        period: "monthly", 
        description: "Unlimited Plan - Unlimited words/month"
      }
    };

    const selectedPlan = plans[planId] || plans["pro_plan"];

    const result = await instance.subscriptions.create({
      plan_id: process.env.SUBSCRIPTION_PLAN_ID || planId, // Use environment variable or fallback
      total_count: 12, // 12 months
      customer_notify: 1,
      quantity: 1,
      notes: {
        planName: planName,
        planId: planId,
        description: selectedPlan.description
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
