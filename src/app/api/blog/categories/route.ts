import { NextResponse } from 'next/server';
import { getBlogCategories, getBlogStats } from '@/app/lib/blog';

export async function GET() {
  try {
    const categories = getBlogCategories();
    const stats = getBlogStats();
    
    return NextResponse.json({
      success: true,
      data: {
        categories,
        stats: stats.categories,
      },
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog categories',
      },
      { status: 500 }
    );
  }
} 