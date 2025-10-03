import { NextResponse } from 'next/server';
import { getBlogCategories, getBlogStats } from '@/lib/blog';

export function GET() {
  try {
    const categories = getBlogCategories();
    const stats = getBlogStats();

    return NextResponse.json({
      success: true,
      data: {
        categories,
        stats: stats.categories
      }
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog categories'
      },
      { status: 500 }
    );
  }
}
