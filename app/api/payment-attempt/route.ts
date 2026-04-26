import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// FIXED PRICING - Users cannot modify this
const FIXED_PRICE = 99; // ₹99 fixed for users
const FIXED_AMOUNT_PAISE = 9900; // ₹99 in paise (Razorpay uses paise)
const ADMIN_PRICE = 1; // ₹1 for admin testing
const ADMIN_AMOUNT_PAISE = 100; // ₹1 in paise

export async function POST(request: Request) {
  try {
    const { userId, userEmail } = await request.json();

    // Check if user is admin
    const isAdmin = userEmail === 'rohitbadekar555@gmail.com';
    
    // Set pricing based on user type
    const price = isAdmin ? ADMIN_PRICE : FIXED_PRICE;
    const amount = isAdmin ? ADMIN_AMOUNT_PAISE : FIXED_AMOUNT_PAISE;

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

    
    // CREATE ORDER WITH DYNAMIC AMOUNT BASED ON USER TYPE
    const options: any = {
      amount: amount, // Dynamic: ₹1 for admin, ₹99 for users
      currency: "INR",
      receipt: `rc_${Date.now().toString(36)}`,
      notes: {
        user_id: userId,
        user_email: userEmail,
        plan: "Professional",
        price: price,
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
        display_amount: price, // Show ₹1 for admin, ₹99 for users
        plan_name: "Professional",
        plan_features: isAdmin ? [
          "Admin testing mode",
          "Unlimited access", 
          "Full features"
        ] : [
          "1,00,000 words credits",
          "50+ templates", 
          "Lifetime access",
          "Priority support"
        ]
      },
    });

  } catch (error) {
    console.error('=== PAYMENT ATTEMPT ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Razorpay Key ID exists:', !!process.env.RAZORPAY_KEY_ID);
    console.error('Razorpay Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);
    
    return NextResponse.json(
      { 
        error: "Failed to create payment order",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
