import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, planName } = await request.json();


    // Validate amount
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Minimum amount is Rs 1 (100 paise)' },
        { status: 400 }
      );
    }

    // Create Razorpay order (simple one-time payment)
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planName: planName || 'Test Payment',
        source: 'AI Content Generator',
        timestamp: new Date().toISOString()
      }
    });


    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });

  } catch (error) {
    
    return NextResponse.json(
      { 
        error: 'Failed to create payment order',
        details: String(error),
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
