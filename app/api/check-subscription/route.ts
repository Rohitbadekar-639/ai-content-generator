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
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    let isSubscribed: boolean = false;
    
    if (result && result.length > 0) {
      const subscription = result[0];
      isSubscribed = Boolean(subscription.active && subscription.plan === "Professional");
    }

    return NextResponse.json(
      { 
        isSubscribed: Boolean(isSubscribed),
        subscription: result[0] || null
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
