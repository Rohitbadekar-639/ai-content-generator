import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

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
  
  let email: string | undefined;
  let plan: string | undefined;
  let paymentId: string | undefined;
  
  try {
    const requestData = await request.json();
    email = requestData.email;
    plan = requestData.plan;
    paymentId = requestData.paymentId;
    
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
      // Update existing subscription and add credits
      const currentCredits = existingSubscription[0].credits || 0;
      await db
        .update(UserSubscription)
        .set({
          active: true,
          plan: plan,
          paymentId: paymentId,
          joinDate: new Date().toISOString(),
          credits: currentCredits + 1000000, // Add 1M credits
        })
        .where(eq(UserSubscription.email, email));
      
    } else {
      console.log('📝 Creating new subscription');
      // Create new subscription with 1M credits
      await db.insert(UserSubscription).values({
        email: email,
        userName: email.split('@')[0], // Extract username from email
        active: true,
        plan: plan,
        paymentId: paymentId,
        joinDate: new Date().toISOString(),
        credits: 1000000, // 1M credits for premium users
      });
      
    }

    console.log('✅ Subscription activated successfully for:', email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: '1,000,000 credits added successfully',
        plan: plan,
        creditsAdded: 1000000
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('=== ERROR ACTIVATING SUBSCRIPTION ===');
    console.error('Error:', error);
    console.error('Email:', email);
    console.error('Plan:', plan);
    console.error('Timestamp:', new Date().toISOString());
    
    return NextResponse.json(
      { 
        error: 'Failed to activate subscription',
        details: String(error),
        userFriendlyMessage: 'Subscription activation failed. Please contact support.',
        errorCode: 'SUBSCRIPTION_ACTIVATION_FAILED'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
