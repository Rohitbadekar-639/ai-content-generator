import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription, AIOutput } from "@/utils/schema";
import { eq, desc, count, sql, like } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    console.log('=== FETCHING LIVE ADMIN DATA ===');
    
    // 1. Get ALL users without restrictive date filtering
    const allUsers = await db
      .select({
        email: UserSubscription.email,
        userName: UserSubscription.userName,
        active: UserSubscription.active,
        plan: UserSubscription.plan,
        joinDate: UserSubscription.joinDate,
        paymentId: UserSubscription.paymentId,
      })
      .from(UserSubscription)
      .orderBy(desc(UserSubscription.joinDate));

    console.log('Total users found:', allUsers.length);

    // 2. Get ALL content without restrictive filtering
    const allContent = await db
      .select({
        id: AIOutput.id,
        formData: AIOutput.formData,
        aiResponse: AIOutput.aiResponse,
        templateSlug: AIOutput.templateSlug,
        createdBy: AIOutput.createdBy,
        createdAt: AIOutput.createdAt,
      })
      .from(AIOutput)
      .orderBy(desc(AIOutput.createdAt));

    console.log('Total content found:', allContent.length);

    // 3. Calculate real metrics
    const totalUsers = allUsers.length;
    const paidUsers = allUsers.filter(user => user.active && user.email !== 'rohitbadekar555@gmail.com').length;
    const freeUsers = totalUsers - paidUsers;
    const adminUsers = allUsers.filter(user => user.email === 'rohitbadekar555@gmail.com').length;
    
    // Calculate revenue (₹99 per paid user)
    const totalRevenue = paidUsers * 99;
    const currentMonthRevenue = paidUsers * 99; // Simplified for now
    
    // 4. Template usage statistics
    const templateUsage = allContent.reduce((acc, content) => {
      const template = content.templateSlug || 'unknown';
      acc[template] = (acc[template] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const templateUsageArray = Object.entries(templateUsage)
      .map(([templateSlug, count]) => ({ templateSlug, count }))
      .sort((a, b) => b.count - a.count);

    // 5. Recent activities (last 50)
    const recentActivities = allContent.slice(0, 50).map(content => ({
      email: content.createdBy || 'unknown',
      templateSlug: content.templateSlug || 'unknown',
      createdAt: content.createdAt || new Date().toISOString(),
      aiResponse: content.aiResponse?.substring(0, 100) + '...' || 'No response',
    }));

    // 6. Top users by content creation
    const userContentMap = allContent.reduce((acc, content) => {
      const email = content.createdBy || 'unknown';
      if (!acc[email]) {
        acc[email] = { count: 0, lastActivity: content.createdAt || new Date().toISOString() };
      }
      acc[email].count++;
      if (content.createdAt && (!acc[email].lastActivity || content.createdAt > acc[email].lastActivity)) {
        acc[email].lastActivity = content.createdAt;
      }
      return acc;
    }, {} as Record<string, { count: number; lastActivity: string }>);

    const topUsers = Object.entries(userContentMap)
      .map(([email, data]) => ({ email, contentCount: data.count, lastActivity: data.lastActivity }))
      .sort((a, b) => b.contentCount - a.contentCount)
      .slice(0, 20);

    // 7. User statistics with content counts
    const usersWithStats = allUsers.map(user => {
      const userContent = userContentMap[user.email] || { count: 0, lastActivity: new Date().toISOString() };
      return {
        ...user,
        contentCount: userContent.count,
        lastActivity: userContent.lastActivity,
      };
    });

    // 8. Content timeline (last 30 days of activity)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const contentTimeline = allContent
      .filter(content => {
        if (!content.createdAt) return false;
        try {
          const contentDate = new Date(content.createdAt);
          return contentDate >= thirtyDaysAgo;
        } catch {
          return false;
        }
      })
      .reduce((acc, content) => {
        const date = new Date(content.createdAt || '').toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date, count: 0, uniqueUsers: new Set() };
        }
        acc[date].count++;
        acc[date].uniqueUsers.add(content.createdBy || 'unknown');
        return acc;
      }, {} as Record<string, { date: string; count: number; uniqueUsers: Set<string> }>);

    const timelineArray = Object.values(contentTimeline)
      .map(item => ({ 
        date: item.date, 
        count: item.count, 
        uniqueUsers: item.uniqueUsers.size 
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30);

    // 9. System health
    const systemHealth = {
      databaseStatus: 'healthy',
      lastDataUpdate: new Date().toISOString(),
      activeConnections: 1,
      averageResponseTime: Math.floor(Math.random() * 50) + 100, // Mock response time
      totalRecords: {
        users: totalUsers,
        content: allContent.length,
      },
    };

    // 10. Financial summary
    const financialSummary = {
      totalRevenue,
      currentMonthRevenue,
      averageRevenuePerUser: paidUsers > 0 ? totalRevenue / paidUsers : 0,
      conversionRate: totalUsers > 0 ? (paidUsers / totalUsers) * 100 : 0,
      monthlyGrowthRate: 0, // Would need historical data
    };

    const liveData = {
      metrics: {
        totalUsers,
        paidUsers,
        freeUsers,
        newUsers: totalUsers, // All users are "new" for now
        totalRevenue,
        currentMonthRevenue,
        totalContent: allContent.length,
        recentContent: allContent.length, // All content is "recent" for now
      },
      financialSummary,
      subscriptionGrowth: [], // Would need historical data
      templateUsage: templateUsageArray,
      recentActivities,
      topUsers,
      recentUsers: usersWithStats,
      systemHealth,
      allUsers: usersWithStats,
      allContent: allContent.slice(0, 100), // Last 100 content items
      contentTimeline: timelineArray,
      timeframe: 'all',
      generatedAt: new Date().toISOString(),
    };

    console.log('✅ Live data fetched successfully');
    console.log('Metrics:', liveData.metrics);

    return NextResponse.json({
      success: true,
      data: liveData,
    });

  } catch (error) {
    console.error('=== LIVE ADMIN DATA ERROR ===');
    console.error('Error:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: "Failed to fetch live admin data",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
