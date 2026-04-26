import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  try {
    console.log('=== SYNCING USERS FROM CLERK ===');
    
    // Get current user and verify admin
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = user.emailAddresses[0]?.emailAddress;
    if (adminEmail !== 'rohitbadekar555@gmail.com') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get all users from Clerk
    const client = await clerkClient();
    const clerkUsers = await client.users.getUserList({
      limit: 100,
      offset: 0
    });

    console.log('Found', clerkUsers.totalCount, 'users in Clerk');

    let syncedCount = 0;
    let createdCount = 0;
    let updatedCount = 0;

    for (const clerkUser of clerkUsers.data) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      
      if (!email) continue;

      // Check if user exists in our database
      const existingUser = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, email));

      const userData = {
        email: email,
        userName: clerkUser.firstName || clerkUser.username || email.split('@')[0],
        active: existingUser.length > 0 ? existingUser[0].active : false,
        plan: existingUser.length > 0 ? existingUser[0].plan : "Free",
        paymentId: existingUser.length > 0 ? existingUser[0].paymentId : null,
        joinDate: existingUser.length > 0 ? existingUser[0].joinDate : new Date(clerkUser.createdAt || Date.now()).toISOString(),
      };

      if (existingUser.length === 0) {
        // Create new user record
        await db.insert(UserSubscription).values(userData);
        console.log('✅ Created user:', email);
        createdCount++;
      } else {
        // Update existing user record with latest info
        await db
          .update(UserSubscription)
          .set({
            userName: userData.userName,
            joinDate: userData.joinDate,
          })
          .where(eq(UserSubscription.email, email));
        console.log('🔄 Updated user:', email);
        updatedCount++;
      }

      syncedCount++;
    }

    console.log('=== SYNC COMPLETE ===');
    console.log('Total synced:', syncedCount);
    console.log('New users created:', createdCount);
    console.log('Existing users updated:', updatedCount);

    return NextResponse.json({
      success: true,
      message: "User sync completed successfully",
      stats: {
        totalClerkUsers: clerkUsers.totalCount,
        syncedUsers: syncedCount,
        newUsersCreated: createdCount,
        existingUsersUpdated: updatedCount
      }
    });

  } catch (error) {
    console.error('=== USER SYNC ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to sync users',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
