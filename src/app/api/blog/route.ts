import { NextResponse } from 'next/server';
import { getAllPosts, getBlogStats } from '@/lib/blog';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const stats = await getBlogStats();
    
    return NextResponse.json({
      success: true,
      data: {
        posts,
        stats,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
} 