import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Razorpay-Signature',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await request.text();
    const headersList = await headers();
    
    // Get Razorpay signature from headers
    const razorpay_signature = headersList.get("x-razorpay-signature");
    
    if (!razorpay_signature) {
      console.error('=== WEBHOOK ERROR: Missing Razorpay signature ===');
      console.error('Headers received:', Object.fromEntries(headersList.entries()));
      return NextResponse.json({ error: 'Missing signature' }, { status: 400, headers: corsHeaders });
    }

    // Your Razorpay webhook secret (you'll get this from Razorpay dashboard)
    const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhook_secret) {
      console.error('=== WEBHOOK ERROR: Missing webhook secret ===');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500, headers: corsHeaders });
    }

    // Verify webhook signature
    const expected_signature = crypto
      .createHmac('sha256', webhook_secret)
      .update(body)
      .digest('hex');

    if (razorpay_signature !== expected_signature) {
      console.error('=== WEBHOOK ERROR: Invalid webhook signature ===');
      console.error('Received signature:', razorpay_signature);
      console.error('Expected signature:', expected_signature);
      console.error('Body length:', body.length);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400, headers: corsHeaders });
    }

    // Parse the webhook event
    let event;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error('=== WEBHOOK ERROR: Invalid JSON ===');
      console.error('Parse error:', parseError);
      console.error('Body preview:', body.substring(0, 200));
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: corsHeaders });
    }

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      
      // Extract payment details
      const paymentId = payment.id;
      const amount = payment.amount; // Amount in paise
      const status = payment.status;
      const email = payment.email;
      const currency = payment.currency;
      const method = payment.method;
      const notes = payment.notes || {};
      
      console.log('=== WEBHOOK PAYMENT CAPTURED ===');
      console.log('Payment ID:', paymentId);
      console.log('Amount:', amount);
      console.log('Currency:', currency);
      console.log('Status:', status);
      console.log('Email:', email);
      console.log('Method:', method);
      console.log('Notes:', notes);

      // Only process successful payments of valid amounts
      const validAmounts = [9900, 900, 100]; // ₹99 (India), $9 (International), ₹1 (Admin)
      if (status === 'captured' && validAmounts.includes(amount)) {
        // Check if user already has a subscription
        const existingSubscription = await db
          .select()
          .from(UserSubscription)
          .where(eq(UserSubscription.email, email));

        if (existingSubscription && existingSubscription.length > 0) {
          // Update existing subscription and add credits
          const currentCredits = existingSubscription[0].credits || 0;
          await db
            .update(UserSubscription)
            .set({
              active: true,
              plan: "Professional",
              paymentId: paymentId,
              joinDate: new Date().toISOString(),
              credits: currentCredits + 1000000, // Add 1M credits
            })
            .where(eq(UserSubscription.email, email));
          
        } else {
          // Create new subscription with 1M credits
          await db.insert(UserSubscription).values({
            email: email,
            userName: email.split('@')[0],
            active: true,
            plan: "Professional",
            paymentId: paymentId,
            joinDate: new Date().toISOString(),
            credits: 1000000, // 1M credits for premium users
          });
          
        }

      } else {
        console.log('=== WEBHOOK: Payment not processed ===');
        console.log('Reason: Invalid amount or status', { amount, status });
      }
    } else {
      console.log('=== WEBHOOK: Non-payment event ===');
      console.log('Event type:', event.event);
    }

    // Return success response
    console.log('=== WEBHOOK PROCESSED SUCCESSFULLY ===');
    return NextResponse.json({ received: true }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('=== WEBHOOK ERROR ===');
    console.error('Error:', error);
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
