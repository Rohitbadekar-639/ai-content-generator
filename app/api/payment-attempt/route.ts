import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// FIXED PRICING - Users cannot modify this
const FIXED_PRICE = 99; // ₹99 fixed
const FIXED_AMOUNT_PAISE = 9900; // ₹99 in paise (Razorpay uses paise)

export async function POST(request: Request) {
  try {
    const { userId, userEmail } = await request.json();

    // Validate required fields
    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 400 }
      );
    }

    // Check Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // CREATE FIXED AMOUNT ORDER - Users cannot change this
    const options = {
      amount: FIXED_AMOUNT_PAISE, // FIXED: ₹99 - NO MODIFICATION ALLOWED
      currency: "INR",
      receipt: `rapidcontent_${userId}_${Date.now()}`,
      notes: {
        user_id: userId,
        user_email: userEmail,
        plan: "Professional",
        price: FIXED_PRICE,
        timestamp: new Date().toISOString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        // IMPORTANT: Send fixed price to frontend for display
        display_amount: FIXED_PRICE,
        plan_name: "Professional",
        plan_features: [
          "10,00,000 words/month",
          "50+ templates", 
          "Priority support",
          "Unlimited downloads"
        ]
      },
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: "Failed to create payment order",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
