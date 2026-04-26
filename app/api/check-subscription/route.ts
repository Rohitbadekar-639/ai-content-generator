import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user is admin
    const isAdmin = email === 'rohitbadekar555@gmail.com';
    
    // Admin gets automatic subscription
    if (isAdmin) {
      return NextResponse.json(
        { 
          isSubscribed: true,
          subscription: {
            email: email,
            active: true,
            plan: 'Professional',
            paymentId: 'admin-access',
            joinDate: new Date().toISOString()
          }
        },
        { status: 200 }
      );
    }

    // Check regular user subscription
    console.log('🔍 Checking subscription for email:', email);
    
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    console.log('📊 Database result:', result);
    console.log('📊 Result length:', result?.length);

    let isSubscribed: boolean = false;
    let subscriptionData = null;
    
    if (result && result.length > 0) {
      const subscription = result[0];
      console.log('📋 Found subscription:', subscription);
      console.log('📋 Subscription active:', subscription.active);
      console.log('📋 Subscription plan:', subscription.plan);
      
      // Check if user has paid (Professional plan) or is still Free
      isSubscribed = Boolean(subscription.active && subscription.plan === "Professional");
      
      // If user has Free plan but active=true, they haven't paid yet
      if (subscription.active && subscription.plan === "Free") {
        console.log('⚠️ User has Free plan - not subscribed');
        isSubscribed = false;
      }
      
      subscriptionData = subscription;
      
      console.log('✅ User is subscribed:', isSubscribed);
    } else {
      console.log('❌ No subscription found for user');
    }

    return NextResponse.json(
      { 
        isSubscribed: Boolean(isSubscribed),
        subscription: subscriptionData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== CHECK SUBSCRIPTION ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to check subscription',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
