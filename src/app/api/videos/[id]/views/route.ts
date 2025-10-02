import { NextRequest, NextResponse } from 'next/server';
import { db, videos } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET - 获取视频浏览量
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await db.select({
      viewCount: videos.viewCount
    })
    .from(videos)
    .where(eq(videos.id, id))
    .limit(1);

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      videoId: id,
      views: data[0].viewCount
    });
  } catch (error) {
    console.error('Error getting video views:', error);
    return NextResponse.json(
      { error: 'Failed to get video views' },
      { status: 500 }
    );
  }
}

// POST - 增加视频浏览量
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查视频是否存在
    const existingVideo = await db.select({
      viewCount: videos.viewCount
    })
    .from(videos)
    .where(eq(videos.id, id))
    .limit(1);

    if (existingVideo.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // 增加浏览量
    const updatedData = await db.update(videos)
      .set({
        viewCount: existingVideo[0].viewCount + 1,
        updatedAt: new Date()
      })
      .where(eq(videos.id, id))
      .returning({ viewCount: videos.viewCount });

    return NextResponse.json({
      videoId: id,
      views: updatedData[0].viewCount
    });
  } catch (error) {
    console.error('Error incrementing video views:', error);
    return NextResponse.json(
      { error: 'Failed to increment video views' },
      { status: 500 }
    );
  }
}