import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json');

// 确保数据目录存在
function ensureDataDir() {
  const dataDir = path.dirname(VIEWS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 读取浏览量数据
function readViews(): Record<string, number> {
  try {
    if (!fs.existsSync(VIEWS_FILE)) {
      return {};
    }
    const data = fs.readFileSync(VIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading views file:', error);
    return {};
  }
}

// 写入浏览量数据
function writeViews(views: Record<string, number>) {
  try {
    ensureDataDir();
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2));
  } catch (error) {
    console.error('Error writing views file:', error);
  }
}

// GET - 获取浏览量
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const decodedPostId = decodeURIComponent(postId);
    const views = readViews();
    
    return NextResponse.json({
      postId: decodedPostId,
      views: views[decodedPostId] || 0
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
    const views = readViews();
    
    // 增加浏览量
    views[decodedPostId] = (views[decodedPostId] || 0) + 1;
    writeViews(views);
    
    return NextResponse.json({
      postId: decodedPostId,
      views: views[decodedPostId]
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}