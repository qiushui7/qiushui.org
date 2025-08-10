import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - 获取浏览量
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const decodedPostId = decodeURIComponent(postId);
    
    const { data, error } = await supabase
      .from('post_views')
      .select('views')
      .eq('post_id', decodedPostId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error getting views:', error);
      return NextResponse.json(
        { error: 'Failed to get views' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      postId: decodedPostId,
      views: data?.views || 0
    });
  } catch (error) {
    console.error('Error getting views:', error);
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
    const { data: existingData } = await supabase
      .from('post_views')
      .select('views')
      .eq('post_id', decodedPostId)
      .single();

    if (existingData) {
      // 如果记录存在，增加计数
      const { data, error } = await supabase
        .from('post_views')
        .update({ views: existingData.views + 1 })
        .eq('post_id', decodedPostId)
        .select()
        .single();

      if (error) {
        console.error('Error updating views:', error);
        return NextResponse.json(
          { error: 'Failed to update views' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        postId: decodedPostId,
        views: data.views
      });
    } else {
      // 如果记录不存在，创建新记录
      const { data, error } = await supabase
        .from('post_views')
        .insert({ post_id: decodedPostId, views: 1 })
        .select()
        .single();

      if (error) {
        console.error('Error creating views record:', error);
        return NextResponse.json(
          { error: 'Failed to create views record' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        postId: decodedPostId,
        views: data.views
      });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}