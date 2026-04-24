import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, plan, paymentId } = await request.json();

    console.log('=== ACTIVATING SUBSCRIPTION ===');
    console.log('Email:', email);
    console.log('Plan:', plan);
    console.log('Payment ID:', paymentId);

    if (!email) {
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

    if (existingSubscription && existingSubscription.length > 0) {
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
      
      console.log('Updated existing subscription for:', email);
    } else {
      // Create new subscription
      await db.insert(UserSubscription).values({
        email: email,
        userName: email.split('@')[0], // Extract username from email
        active: true,
        plan: plan,
        paymentId: paymentId,
        joinDate: new Date().toISOString(),
      });
      
      console.log('Created new subscription for:', email);
    }

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
