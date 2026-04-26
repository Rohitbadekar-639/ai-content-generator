import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { eq, desc, count, sql, like } from "drizzle-orm";

// GET all content with user information
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const templateFilter = searchParams.get('template') || '';
    const userFilter = searchParams.get('user') || '';
    
    const offset = (page - 1) * limit;

    // Build query conditions
    let whereCondition = sql`1=1`;
    
    if (search) {
      whereCondition = sql`${whereCondition} AND (${AIOutput.aiResponse} ILIKE ${'%' + search + '%'} OR ${AIOutput.templateSlug} ILIKE ${'%' + search + '%'} OR ${AIOutput.createdBy} ILIKE ${'%' + search + '%'})`;
    }
    
    if (templateFilter) {
      whereCondition = sql`${whereCondition} AND ${AIOutput.templateSlug} = ${templateFilter}`;
    }
    
    if (userFilter) {
      whereCondition = sql`${whereCondition} AND ${AIOutput.createdBy} = ${userFilter}`;
    }

    // Get content with user subscription info
    const content = await db
      .select({
        id: AIOutput.id,
        formData: AIOutput.formData,
        aiResponse: AIOutput.aiResponse,
        templateSlug: AIOutput.templateSlug,
        createdBy: AIOutput.createdBy,
        createdAt: AIOutput.createdAt,
        userActive: sql`(SELECT ${UserSubscription.active} FROM ${UserSubscription} WHERE ${UserSubscription.email} = ${AIOutput.createdBy})`,
        userPlan: sql`(SELECT ${UserSubscription.plan} FROM ${UserSubscription} WHERE ${UserSubscription.email} = ${AIOutput.createdBy})`,
      })
      .from(AIOutput)
      .where(whereCondition)
      .orderBy(desc(AIOutput.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: count() })
      .from(AIOutput)
      .where(whereCondition);

    // Get template usage statistics
    const templateStats = await db
      .select({
        templateSlug: AIOutput.templateSlug,
        count: count(),
        uniqueUsers: sql`COUNT(DISTINCT ${AIOutput.createdBy})`,
      })
      .from(AIOutput)
      .groupBy(AIOutput.templateSlug)
      .orderBy(sql`count DESC`);

    // Get content generation timeline (last 30 days)
    const timeline = await db
      .select({
        date: sql`DATE(${AIOutput.createdAt})`,
        count: count(),
        uniqueUsers: sql`COUNT(DISTINCT ${AIOutput.createdBy})`,
      })
      .from(AIOutput)
      .where(sql`${AIOutput.createdAt} >= NOW() - INTERVAL '30 days'`)
      .groupBy(sql`DATE(${AIOutput.createdAt})`)
      .orderBy(sql`DATE(${AIOutput.createdAt})`);

    return NextResponse.json({
      success: true,
      data: {
        content,
        pagination: {
          page,
          limit,
          total: totalCount[0].count,
          totalPages: Math.ceil(totalCount[0].count / limit),
        },
        templateStats,
        timeline,
      },
    });

  } catch (error) {
    console.error('=== ADMIN CONTENT ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch content",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE content
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    console.log('=== ADMIN CONTENT DELETE ===');
    console.log('Content ID:', id);

    // Delete content
    await db
      .delete(AIOutput)
      .where(eq(AIOutput.id, parseInt(id)));

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully',
    });

  } catch (error) {
    console.error('=== ADMIN CONTENT DELETE ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to delete content",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
