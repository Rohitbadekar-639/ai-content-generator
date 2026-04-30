import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Razorpay from "razorpay";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { PAYMENT_CONFIG, getPricingInfo } from "@/lib/payment-config";

// FIXED PRICING - Users cannot modify this
const INDIA_PRICE = 99; // ₹99 for Indian users
const INDIA_AMOUNT_PAISE = 9900; // ₹99 in paise (Razorpay uses paise)
const INTERNATIONAL_PRICE = 9; // $9 for international users
const INTERNATIONAL_AMOUNT_CENTS = 900; // $9 in cents
const ADMIN_PRICE = 1; // ₹1 for admin testing
const ADMIN_AMOUNT_PAISE = 100; // ₹1 in paise

export async function POST(request: Request) {
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }
  
  let userId: string | undefined;
  let userEmail: string | undefined;
  
  try {
    const requestData = await request.json();
    userId = requestData.userId;
    userEmail = requestData.userEmail;
    const currency = requestData.currency || 'INR';
    const paymentMethod = requestData.paymentMethod || 'card';

    // Check if user is admin
    const isAdmin = userEmail === 'rohitbadekar555@gmail.com';
    
    // Set pricing based on user type and currency
    let price: number;
    let amount: number;
    
    if (isAdmin) {
      price = ADMIN_PRICE;
      amount = ADMIN_AMOUNT_PAISE;
    } else {
      // Get localized price based on currency
      if (currency === 'USD') {
        price = INTERNATIONAL_PRICE; // $9 for international users
        amount = INTERNATIONAL_AMOUNT_CENTS; // $9 in cents
      } else {
        price = INDIA_PRICE; // ₹99 for Indian users (default)
        amount = INDIA_AMOUNT_PAISE;
      }
    }

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

    
    // CREATE ORDER WITH DYNAMIC AMOUNT AND CURRENCY
    const options: any = {
      amount: amount, // Dynamic based on currency and user type
      currency: currency, // Support multiple currencies
      receipt: `rc_${Date.now().toString(36)}`,
      notes: {
        user_id: userId,
        user_email: userEmail,
        plan: "Professional",
        price: price,
        currency: currency,
        payment_method: paymentMethod,
        is_admin: isAdmin,
      },
    };

    console.log('Creating Razorpay order with options:', options);
    console.log('Using Razorpay Key ID:', process.env.RAZORPAY_KEY_ID?.substring(0, 10) + '...');

    let order;
    try {
      order = await razorpay.orders.create(options);
      console.log('✅ Razorpay order created:', order);
    } catch (razorpayError: any) {
      console.error('❌ Razorpay order creation failed:', razorpayError);
      console.error('Error details:', {
        message: razorpayError?.message || 'Unknown error',
        code: razorpayError?.code || 'UNKNOWN',
        description: razorpayError?.description || 'No description',
        statusCode: razorpayError?.statusCode || 'N/A'
      });
      
      return NextResponse.json(
        { 
          error: `Razorpay order creation failed: ${razorpayError?.message || 'Unknown error'}`,
          details: razorpayError?.description || 'Unknown Razorpay error',
          code: razorpayError?.code || 'UNKNOWN'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        display_amount: price,
        display_currency: currency,
        payment_method: paymentMethod,
        plan_name: "Professional",
        plan_features: isAdmin ? [
          "Admin testing mode",
          "Unlimited access", 
          "Full features"
        ] : [
          "1,000,000 words credits",
          "20+ templates", 
          "Credits never expire",
          "Priority support",
          `Payment in ${currency}`
        ]
      },
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('=== PAYMENT ATTEMPT ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Razorpay Key ID exists:', !!process.env.RAZORPAY_KEY_ID);
    console.error('Razorpay Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);
    console.error('User Email:', userEmail);
    console.error('Timestamp:', new Date().toISOString());
    
    // Detailed error logging for debugging
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      userEmail: userEmail,
      userId: userId,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID?.substring(0, 10) + '...'
    };
    
    console.error('Detailed error info:', errorDetails);
    
    return NextResponse.json(
      { 
        error: "Failed to create payment order",
        details: error instanceof Error ? error.message : "Unknown error",
        userFriendlyMessage: "Payment initialization failed. Please try again or contact support.",
        errorCode: "PAYMENT_ORDER_FAILED"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
