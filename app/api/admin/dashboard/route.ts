import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription, AIOutput } from "@/utils/schema";
import { eq, desc, count, sum, gte, lte } from "drizzle-orm";

export async function GET(request: Request) {
  try {

    // Get total users
    const totalUsersResult = await db
      .select({ count: count() })
      .from(UserSubscription);
    
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Get active subscriptions
    const activeSubscriptionsResult = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(eq(UserSubscription.active, true));
    
    const activeSubscriptions = activeSubscriptionsResult[0]?.count || 0;
    const totalRevenue = activeSubscriptions * 99; // ₹99 per active subscription

    // Get total content generated
    const totalContentResult = await db
      .select({ count: count() })
      .from(AIOutput);
    
    const totalContent = totalContentResult[0]?.count || 0;

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayUsersResult = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(gte(UserSubscription.joinDate, today.toISOString()));
    
    const todayUsers = todayUsersResult[0]?.count || 0;

    const todayContentResult = await db
      .select({ count: count() })
      .from(AIOutput)
      .where(gte(AIOutput.createdAt, today.toISOString()));
    
    const todayContent = todayContentResult[0]?.count || 0;

    // Get last 7 days stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyUsersResult = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(gte(UserSubscription.joinDate, sevenDaysAgo.toISOString()));
    
    const weeklyUsers = weeklyUsersResult[0]?.count || 0;

    const weeklyContentResult = await db
      .select({ count: count() })
      .from(AIOutput)
      .where(gte(AIOutput.createdAt, sevenDaysAgo.toISOString()));
    
    const weeklyContent = weeklyContentResult[0]?.count || 0;

    // Get content by template for analytics
    const contentByTemplate = await db
      .select({
        templateSlug: AIOutput.templateSlug,
        count: count()
      })
      .from(AIOutput)
      .groupBy(AIOutput.templateSlug)
      .orderBy(desc(count()))
      .limit(10);

    // Get most active users
    const activeUsersByContent = await db
      .select({
        email: AIOutput.createdBy,
        contentCount: count()
      })
      .from(AIOutput)
      .groupBy(AIOutput.createdBy)
      .orderBy(desc(count()))
      .limit(10);

    // Get recent users
    const recentUsers = await db
      .select()
      .from(UserSubscription)
      .orderBy(desc(UserSubscription.joinDate))
      .limit(10);

    // Get recent activity
    const recentActivity = await db
      .select()
      .from(AIOutput)
      .orderBy(desc(AIOutput.createdAt))
      .limit(10);

    const stats = {
      totalUsers,
      totalRevenue,
      totalContent,
      activeSubscriptions,
      todayUsers,
      todayContent,
      weeklyUsers,
      weeklyContent,
    };

    const analytics = {
      contentByTemplate,
      activeUsersByContent,
      recentActivity,
    };

    // Add mock payment data for now
    const recentPayments = recentActivity.slice(0, 5).map(activity => ({
      email: activity.createdBy,
      createdAt: activity.createdAt,
      amount: 9900 // ₹99 in paise
    }));

    return NextResponse.json({
      success: true,
      stats,
      analytics,
      recentUsers,
      recentPayments,
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch admin dashboard data',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
