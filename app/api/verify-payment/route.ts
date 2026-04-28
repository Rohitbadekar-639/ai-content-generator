import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
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
  
  let razorpay_order_id: string | undefined;
  let razorpay_payment_id: string | undefined;
  let razorpay_signature: string | undefined;
  let expected_amount: number | undefined;
  
  try {
    const requestData = await request.json();
    razorpay_order_id = requestData.razorpay_order_id;
    razorpay_payment_id = requestData.razorpay_payment_id;
    razorpay_signature = requestData.razorpay_signature;
    expected_amount = requestData.expected_amount;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment details" },
        { status: 400 }
      );
    }

    // SECURITY CHECK: Verify expected amount is either ₹1 (100 paise for admin) or ₹99 (9900 paise for users)
    if (expected_amount !== 9900 && expected_amount !== 100) {
      return NextResponse.json(
        { error: 'Invalid payment amount - security violation' },
        { status: 400 }
      );
    }

    // Generate signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    
    // Verify signature
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Payment is valid - success!
    console.log('✅ Payment verified successfully:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount: expected_amount
    });
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      planName: 'Professional'
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('=== PAYMENT VERIFICATION ERROR ===');
    console.error('Error:', error);
    console.error('Payment ID:', razorpay_payment_id);
    console.error('Order ID:', razorpay_order_id);
    console.error('Timestamp:', new Date().toISOString());
    
    return NextResponse.json(
      { 
        error: 'Payment verification failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        userFriendlyMessage: 'Payment verification failed. Please contact support if payment was deducted.',
        errorCode: 'PAYMENT_VERIFICATION_FAILED'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
