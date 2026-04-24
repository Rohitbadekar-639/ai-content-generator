import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    
    // Get Razorpay signature from headers
    const razorpay_signature = headersList.get("x-razorpay-signature");
    
    if (!razorpay_signature) {
      console.error('Missing Razorpay signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Your Razorpay webhook secret (you'll get this from Razorpay dashboard)
    const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhook_secret) {
      console.error('Missing webhook secret');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Verify webhook signature
    const expected_signature = crypto
      .createHmac('sha256', webhook_secret)
      .update(body)
      .digest('hex');

    if (razorpay_signature !== expected_signature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Parse the webhook event
    const event = JSON.parse(body);
    console.log('=== RAZORPAY WEBHOOK EVENT ===');
    console.log('Event type:', event.event);
    console.log('Event data:', JSON.stringify(event, null, 2));

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      
      // Extract payment details
      const paymentId = payment.id;
      const amount = payment.amount; // Amount in paise
      const status = payment.status;
      const email = payment.email;
      const notes = payment.notes || {};
      
      console.log('=== PAYMENT CAPTURED ===');
      console.log('Payment ID:', paymentId);
      console.log('Amount:', amount);
      console.log('Status:', status);
      console.log('Email:', email);
      console.log('Notes:', notes);

      // Only process successful payments of ₹99 (9900 paise)
      if (status === 'captured' && amount === 9900) {
        // Check if user already has a subscription
        const existingSubscription = await db
          .select()
          .from(UserSubscription)
          .where(eq(UserSubscription.email, email));

        if (existingSubscription && existingSubscription.length > 0) {
          // Update existing subscription
          await db
            .update(UserSubscription)
            .set({
              active: true,
              plan: "Professional",
              paymentId: paymentId,
              joinDate: new Date().toISOString(),
            })
            .where(eq(UserSubscription.email, email));
          
          console.log('Updated existing subscription for:', email);
        } else {
          // Create new subscription
          await db.insert(UserSubscription).values({
            email: email,
            userName: email.split('@')[0],
            active: true,
            plan: "Professional",
            paymentId: paymentId,
            joinDate: new Date().toISOString(),
          });
          
          console.log('Created new subscription for:', email);
        }

        console.log('✅ Premium subscription activated for:', email);
      } else {
        console.log('❌ Payment not eligible for premium activation');
      }
    }

    // Return success response
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('=== WEBHOOK ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
