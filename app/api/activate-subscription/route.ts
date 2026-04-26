import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, plan, paymentId } = await request.json();
    
    console.log('=== ACTIVATE SUBSCRIPTION REQUEST ===');
    console.log('Email:', email);
    console.log('Plan:', plan);
    console.log('PaymentId:', paymentId);

    if (!email) {
      console.log('❌ Email is missing');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already has a subscription
    const existingSubscription = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    console.log('Existing subscription:', existingSubscription);

    if (existingSubscription && existingSubscription.length > 0) {
      console.log('📝 Updating existing subscription');
      // Update existing subscription
      await db
        .update(UserSubscription)
        .set({
          active: true,
          plan: plan,
          paymentId: paymentId,
          joinDate: new Date().toISOString(),
        })
        .where(eq(UserSubscription.email, email));
      
    } else {
      console.log('📝 Creating new subscription');
      // Create new subscription
      await db.insert(UserSubscription).values({
        email: email,
        userName: email.split('@')[0], // Extract username from email
        active: true,
        plan: plan,
        paymentId: paymentId,
        joinDate: new Date().toISOString(),
      });
      
    }

    console.log('✅ Subscription activated successfully for:', email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscription activated successfully',
        plan: plan
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== ERROR ACTIVATING SUBSCRIPTION ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to activate subscription',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
