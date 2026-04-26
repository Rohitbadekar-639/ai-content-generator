import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription, AIOutput } from "@/utils/schema";
import { eq, desc, count, and, gte, lte, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '30d'; // 7d, 30d, 90d, 1y
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch(timeframe) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // 1. USER METRICS
    const totalUsers = await db
      .select({ count: count() })
      .from(UserSubscription);

    const paidUsers = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(and(
        eq(UserSubscription.active, true),
        sql`${UserSubscription.email} != 'rohitbadekar555@gmail.com'`
      ));

    const newUsers = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(gte(UserSubscription.joinDate, startDate.toISOString()));

    // 2. REVENUE METRICS
    const totalRevenue = paidUsers[0].count * 99; // ₹99 per paid user
    const monthlyRevenue = await db
      .select({ count: count() })
      .from(UserSubscription)
      .where(and(
        eq(UserSubscription.active, true),
        gte(UserSubscription.joinDate, startDate.toISOString()),
        sql`${UserSubscription.email} != 'rohitbadekar555@gmail.com'`
      ));

    const currentMonthRevenue = monthlyRevenue[0].count * 99;

    // 3. CONTENT METRICS
    const totalContent = await db
      .select({ count: count() })
      .from(AIOutput);

    const recentContent = await db
      .select({ count: count() })
      .from(AIOutput)
      .where(gte(AIOutput.createdBy, startDate.toISOString()));

    // 4. TEMPLATE USAGE
    const templateUsage = await db
      .select({
        templateSlug: AIOutput.templateSlug,
        count: count(),
      })
      .from(AIOutput)
      .groupBy(AIOutput.templateSlug)
      .orderBy(sql`count DESC`)
      .limit(10);

    // 5. USER ACTIVITY (last 100 activities)
    const recentActivities = await db
      .select({
        email: AIOutput.createdBy,
        templateSlug: AIOutput.templateSlug,
        createdAt: sql`CASE WHEN ${AIOutput.createdAt} IS NOT NULL AND ${AIOutput.createdAt} != '' AND ${AIOutput.createdAt} ~ '^\d{4}-\d{2}-\d{2}' THEN ${AIOutput.createdAt} ELSE NULL END`,
        aiResponse: AIOutput.aiResponse,
      })
      .from(AIOutput)
      .orderBy(sql`CASE WHEN ${AIOutput.createdAt} IS NOT NULL AND ${AIOutput.createdAt} != '' AND ${AIOutput.createdAt} ~ '^\d{4}-\d{2}-\d{2}' THEN ${AIOutput.createdAt} ELSE NULL END DESC`)
      .limit(100);

    // 6. SUBSCRIPTION GROWTH (daily data)
    const subscriptionGrowth = await db
      .select({
        date: sql`DATE(${UserSubscription.joinDate})`,
        newUsers: count(),
        paidUsers: sql`SUM(CASE WHEN ${UserSubscription.active} = true AND ${UserSubscription.email} != 'rohitbadekar555@gmail.com' THEN 1 ELSE 0 END)`,
      })
      .from(UserSubscription)
      .where(gte(UserSubscription.joinDate, startDate.toISOString()))
      .groupBy(sql`DATE(${UserSubscription.joinDate})`)
      .orderBy(sql`DATE(${UserSubscription.joinDate})`);

    // 7. TOP USERS BY USAGE
    const topUsers = await db
      .select({
        email: AIOutput.createdBy,
        contentCount: count(),
        lastActivity: sql`MAX(CASE WHEN ${AIOutput.createdAt} IS NOT NULL AND ${AIOutput.createdAt} != '' THEN ${AIOutput.createdAt} ELSE NULL END)`,
      })
      .from(AIOutput)
      .groupBy(AIOutput.createdBy)
      .orderBy(sql`count DESC`)
      .limit(20);

    // 8. RECENT USERS WITH SUBSCRIPTION STATUS
    const recentUsersWithStatus = await db
      .select({
        email: UserSubscription.email,
        userName: UserSubscription.userName,
        active: UserSubscription.active,
        plan: UserSubscription.plan,
        joinDate: UserSubscription.joinDate,
        paymentId: UserSubscription.paymentId,
      })
      .from(UserSubscription)
      .orderBy(desc(UserSubscription.joinDate))
      .limit(50);

    // 9. FINANCIAL SUMMARY
    const financialSummary = {
      totalRevenue,
      currentMonthRevenue,
      averageRevenuePerUser: paidUsers[0].count > 0 ? totalRevenue / paidUsers[0].count : 0,
      conversionRate: totalUsers[0].count > 0 ? (paidUsers[0].count / totalUsers[0].count) * 100 : 0,
      monthlyGrowthRate: 0, // Would need previous month data for accurate calculation
    };

    // 10. SYSTEM HEALTH
    const systemHealth = {
      databaseStatus: 'healthy',
      lastDataUpdate: new Date().toISOString(),
      activeConnections: 1, // Would need connection pooling for real data
      averageResponseTime: 120, // Would need monitoring
    };

    const comprehensiveData = {
      metrics: {
        totalUsers: totalUsers[0].count,
        paidUsers: paidUsers[0].count,
        freeUsers: totalUsers[0].count - paidUsers[0].count,
        newUsers: newUsers[0].count,
        totalRevenue,
        currentMonthRevenue,
        totalContent: totalContent[0].count,
        recentContent: recentContent[0].count,
      },
      financialSummary,
      subscriptionGrowth,
      templateUsage,
      recentActivities,
      topUsers,
      recentUsers: recentUsersWithStatus,
      systemHealth,
      timeframe,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: comprehensiveData,
    });

  } catch (error) {
    console.error('=== COMPREHENSIVE ADMIN DATA ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch comprehensive admin data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
