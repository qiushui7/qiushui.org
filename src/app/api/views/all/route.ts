import { NextResponse } from 'next/server';
import { db, postViews } from '@/lib/db';

// GET
export async function GET() {
  try {
    const data = await db.select({
      post_id: postViews.postId,
      views: postViews.views
    }).from(postViews);

    const viewsMap: Record<string, number> = {};
    data.forEach(item => {
      viewsMap[item.post_id] = item.views;
    });

    return NextResponse.json(viewsMap);
  } catch (error) {
    console.error('Error getting all views:', error);
    return NextResponse.json(
      { error: 'Failed to get views data' },
      { status: 500 }
    );
  }
}
