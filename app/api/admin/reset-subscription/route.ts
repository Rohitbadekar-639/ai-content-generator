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

    // Check if user has a subscription
    const existingSubscription = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (existingSubscription && existingSubscription.length > 0) {
      // Update existing subscription to free
      await db
        .update(UserSubscription)
        .set({
          active: false,
          plan: "Free",
          paymentId: null,
          joinDate: new Date().toISOString(),
        })
        .where(eq(UserSubscription.email, email));
      
    } else {
      // Create free subscription
      await db.insert(UserSubscription).values({
        email: email,
        userName: email.split('@')[0],
        active: false,
        plan: "Free",
        paymentId: null,
        joinDate: new Date().toISOString(),
      });
      
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscription reset to Free plan',
        plan: "Free"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== ADMIN: RESET ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to reset subscription',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
