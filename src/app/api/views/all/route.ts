import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - 获取所有浏览量数据
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('post_views')
      .select('post_id, views');
    
    if (error) {
      console.error('Error getting all views:', error);
      return NextResponse.json(
        { error: 'Failed to get views data' },
        { status: 500 }
      );
    }
    
    // 转换为原来的格式 { "post_id": views }
    const viewsMap: Record<string, number> = {};
    data?.forEach(item => {
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