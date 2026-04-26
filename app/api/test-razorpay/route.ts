import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET() {
  try {
    console.log('🔍 Testing Razorpay credentials...');
    console.log('Key ID:', process.env.RAZORPAY_KEY_ID?.substring(0, 10) + '...');
    console.log('Key Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

    // Check if credentials are configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { 
          error: "Razorpay credentials not configured",
          hasKeyId: !!process.env.RAZORPAY_KEY_ID,
          hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET
        },
        { status: 500 }
      );
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log('✅ Razorpay instance created successfully');

    // Test by creating a small test order
    try {
      const testOrder = await razorpay.orders.create({
        amount: 100, // ₹1 in paise
        currency: "INR",
        receipt: `test_order_${Date.now()}`,
        notes: {
          test: "true",
          purpose: "credential_test"
        }
      });
      
      console.log('✅ Razorpay API access confirmed - Test order created');
      
      return NextResponse.json({
        success: true,
        message: "Razorpay credentials are working",
        keyIdPrefix: process.env.RAZORPAY_KEY_ID?.substring(0, 10) + '...',
        testOrder: {
          orderId: testOrder.id,
          amount: testOrder.amount,
          currency: testOrder.currency,
          status: "created"
        }
      });
    } catch (apiError: any) {
      console.error('❌ Razorpay API access failed:', apiError);
      return NextResponse.json(
        { 
          error: "Razorpay API access failed",
          details: apiError.message || 'Unknown API error',
          code: apiError.code || 'UNKNOWN'
        },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('❌ Razorpay test failed:', error);
    return NextResponse.json(
      { 
        error: "Razorpay test failed",
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
