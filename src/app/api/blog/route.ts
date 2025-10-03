import { NextResponse } from 'next/server';
import { getAllPosts, getBlogStats } from '@/lib/blog';

export function GET() {
  try {
    const [posts, stats] = [
      getAllPosts(),
      getBlogStats()
    ];

    return NextResponse.json({
      success: true,
      data: {
        posts,
        stats
      }
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts'
      },
      { status: 500 }
    );
  }
}
