import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription, AIOutput } from "@/utils/schema";
import { eq, desc, count, sql } from "drizzle-orm";

// GET all users with detailed information
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all'; // all, active, inactive, paid, free
    
    const offset = (page - 1) * limit;

    // Build query conditions
    let whereCondition = sql`1=1`;
    
    if (search) {
      whereCondition = sql`${whereCondition} AND (${UserSubscription.email} ILIKE ${'%' + search + '%'} OR ${UserSubscription.userName} ILIKE ${'%' + search + '%'})`;
    }
    
    switch(filter) {
      case 'active':
        whereCondition = sql`${whereCondition} AND ${UserSubscription.active} = true`;
        break;
      case 'inactive':
        whereCondition = sql`${whereCondition} AND ${UserSubscription.active} = false`;
        break;
      case 'paid':
        whereCondition = sql`${whereCondition} AND ${UserSubscription.active} = true AND ${UserSubscription.email} != 'rohitbadekar555@gmail.com'`;
        break;
      case 'free':
        whereCondition = sql`${whereCondition} AND (${UserSubscription.active} = false OR ${UserSubscription.email} = 'rohitbadekar555@gmail.com')`;
        break;
    }

    // Get users with their content counts
    const users = await db
      .select({
        email: UserSubscription.email,
        userName: UserSubscription.userName,
        active: UserSubscription.active,
        plan: UserSubscription.plan,
        joinDate: UserSubscription.joinDate,
        paymentId: UserSubscription.paymentId,
        contentCount: sql`(SELECT COUNT(*) FROM ${AIOutput} WHERE ${AIOutput.createdBy} = ${UserSubscription.email})`,
        lastActivity: sql`(SELECT MAX(CASE WHEN ${AIOutput.createdAt} IS NOT NULL AND ${AIOutput.createdAt} != '' AND ${AIOutput.createdAt} ~ '^\d{4}-\d{2}-\d{2}' THEN ${AIOutput.createdAt} ELSE NULL END) FROM ${AIOutput} WHERE ${AIOutput.createdBy} = ${UserSubscription.email})`,
      })
      .from(UserSubscription)
      .where(whereCondition)
      .orderBy(desc(UserSubscription.joinDate))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(whereCondition);

    // Get summary statistics
    const stats = await db
      .select({
        totalUsers: count(),
        activeUsers: sql`SUM(CASE WHEN ${UserSubscription.active} = true THEN 1 ELSE 0 END)`,
        paidUsers: sql`SUM(CASE WHEN ${UserSubscription.active} = true AND ${UserSubscription.email} != 'rohitbadekar555@gmail.com' THEN 1 ELSE 0 END)`,
        adminUsers: sql`SUM(CASE WHEN ${UserSubscription.email} = 'rohitbadekar555@gmail.com' THEN 1 ELSE 0 END)`,
      })
      .from(UserSubscription);

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: totalCount[0].count,
          totalPages: Math.ceil(totalCount[0].count / limit),
        },
        stats: stats[0],
      },
    });

  } catch (error) {
    console.error('=== ADMIN USERS ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// UPDATE user subscription status
export async function PUT(request: Request) {
  try {
    const { email, active, plan, paymentId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('=== ADMIN USER UPDATE ===');
    console.log('Email:', email);
    console.log('Active:', active);
    console.log('Plan:', plan);

    // Update user subscription
    await db
      .update(UserSubscription)
      .set({
        active: active,
        plan: plan || 'Professional',
        paymentId: paymentId || `admin_update_${Date.now()}`,
        joinDate: new Date().toISOString(), // Update join date for admin actions
      })
      .where(eq(UserSubscription.email, email));

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
    });

  } catch (error) {
    console.error('=== ADMIN USER UPDATE ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to update user",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE user (and their content)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('=== ADMIN USER DELETE ===');
    console.log('Email:', email);

    // Don't allow deletion of admin
    if (email === 'rohitbadekar555@gmail.com') {
      return NextResponse.json(
        { error: 'Cannot delete admin user' },
        { status: 403 }
      );
    }

    // Delete user's content first
    await db
      .delete(AIOutput)
      .where(eq(AIOutput.createdBy, email));

    // Delete user subscription
    await db
      .delete(UserSubscription)
      .where(eq(UserSubscription.email, email));

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });

  } catch (error) {
    console.error('=== ADMIN USER DELETE ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to delete user",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
