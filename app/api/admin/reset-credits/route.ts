import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { targetUserId, targetUserEmail } = await req.json();

    if (!targetUserId || !targetUserEmail) {
      return NextResponse.json({ error: "Target user ID and email are required" }, { status: 400 });
    }

    // Delete all AI output records for the target user to reset their credits
    const deleteResult = await db
      .delete(AIOutput)
      .where(eq(AIOutput.createdBy, targetUserEmail));

    console.log(`Credits reset for user ${targetUserId} by admin ${userId}`);

    return NextResponse.json({ 
      success: true, 
      message: "Credits reset successfully",
      deletedRecords: deleteResult
    });

  } catch (error: any) {
    console.error("Error resetting credits:", error);
    return NextResponse.json(
      { error: "Failed to reset credits" },
      { status: 500 }
    );
  }
}
