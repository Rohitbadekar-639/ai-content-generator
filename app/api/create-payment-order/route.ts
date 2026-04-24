import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, planName } = await request.json();

    console.log('=== PAYMENT ORDER CREATION ===');
    console.log('Plan Name:', planName);
    console.log('Amount:', amount);
    console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);

    // Validate amount
    if (!amount || amount < 100) {
      console.error('Invalid amount:', amount);
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

    console.log('Order created successfully:', order.id);
    console.log('Order details:', {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('=== ERROR CREATING ORDER ===');
    console.error('Error:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
    
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
