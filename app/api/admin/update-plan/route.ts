import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, plan } = await request.json();
    
    console.log('=== UPDATE PLAN REQUEST ===');
    console.log('Email:', email);
    console.log('New Plan:', plan);

    if (!email || !plan) {
      return NextResponse.json(
        { error: 'Email and plan are required' },
        { status: 400 }
      );
    }

    // Update user's plan
    const result = await db
      .update(UserSubscription)
      .set({
        plan: plan,
        active: plan === "Professional" ? true : false,
      })
      .where(eq(UserSubscription.email, email));

    console.log('✅ Plan updated successfully for:', email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: `Plan updated to ${plan} successfully`,
        email: email,
        plan: plan
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== ERROR UPDATING PLAN ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update plan',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
