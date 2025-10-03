import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db, postViews } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET - 获取浏览量
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const decodedPostId = decodeURIComponent(postId);

    const data = await db.select({
      views: postViews.views
    })
      .from(postViews)
      .where(eq(postViews.postId, decodedPostId))
      .limit(1);

    return NextResponse.json({
      postId: decodedPostId,
      views: data[0]?.views || 0
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to get views' },
      { status: 500 }
    );
  }
}

// POST - 增加浏览量
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const decodedPostId = decodeURIComponent(postId);

    // 首先尝试获取现有记录
    const existingData = await db.select({
      views: postViews.views
    })
      .from(postViews)
      .where(eq(postViews.postId, decodedPostId))
      .limit(1);

    if (existingData.length > 0) {
      // 如果记录存在，增加计数
      const updatedData = await db.update(postViews)
        .set({
          views: existingData[0].views + 1,
          updatedAt: new Date()
        })
        .where(eq(postViews.postId, decodedPostId))
        .returning();

      return NextResponse.json({
        postId: decodedPostId,
        views: updatedData[0].views
      });
    }
    // 如果记录不存在，创建新记录
    const newData = await db.insert(postViews)
      .values({
        postId: decodedPostId,
        views: 1
      })
      .returning();

    return NextResponse.json({
      postId: decodedPostId,
      views: newData[0].views
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}
