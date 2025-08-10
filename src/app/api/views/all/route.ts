import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json');

// 读取所有浏览量数据
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

// GET - 获取所有浏览量数据
export async function GET() {
  try {
    const views = readViews();
    return NextResponse.json(views);
  } catch (error) {
    console.error('Error getting all views:', error);
    return NextResponse.json(
      { error: 'Failed to get views data' },
      { status: 500 }
    );
  }
}