import { NextResponse } from 'next/server';
import { db, videos } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET - 获取所有视频浏览量
export async function GET() {
  try {
    const data = await db.select({
      id: videos.id,
      viewCount: videos.viewCount
    })
      .from(videos)
      .where(eq(videos.isPublished, true));

    const viewsMap: Record<string, number> = {};
    data.forEach(video => {
      viewsMap[video.id] = video.viewCount;
    });

    return NextResponse.json(viewsMap);
  } catch {
    return NextResponse.json(
      { error: 'Failed to get video views' },
      { status: 500 }
    );
  }
}
