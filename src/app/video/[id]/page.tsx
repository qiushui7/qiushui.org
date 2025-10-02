import { notFound } from 'next/navigation';
import { db, videos as videosTable, vlogCategories as vlogCategoriesTable } from '@/lib/db';
import { eq } from 'drizzle-orm';
import VideoDetailClient from './VideoDetailClient';


interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  try {
    const video = await db.select({
      title: videosTable.title,
      description: videosTable.description,
      thumbnailUrl: videosTable.thumbnailUrl,
      location: videosTable.location,
    }).from(videosTable)
      .where(eq(videosTable.id, id))
      .limit(1);

    if (!video[0]) {
      return {
        title: 'Video Not Found | qiushui',
        description: 'The requested video could not be found.',
      };
    }

    return {
      title: `${video[0].title} | qiushui`,
      description: video[0].description || 'Watch this video on qiushui\'s vlog',
      openGraph: {
        title: video[0].title,
        description: video[0].description || 'Watch this video on qiushui\'s vlog',
        images: video[0].thumbnailUrl ? [video[0].thumbnailUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Video Not Found | qiushui',
      description: 'The requested video could not be found.',
    };
  }
}

async function getVideoData(id: string) {
  try {
    const videoData = await db.select({
      id: videosTable.id,
      title: videosTable.title,
      description: videosTable.description,
      videoUrl: videosTable.videoUrl,
      viewCount: videosTable.viewCount,
      publishedAt: videosTable.publishedAt,
      createdAt: videosTable.createdAt,
      updatedAt: videosTable.updatedAt,
      thumbnailUrl: videosTable.thumbnailUrl,
      duration: videosTable.duration,
      categoryId: videosTable.categoryId,
      tags: videosTable.tags,
      location: videosTable.location,
      isPublished: videosTable.isPublished,
      categoryName: vlogCategoriesTable.name,
      categorySlug: vlogCategoriesTable.slug,
    }).from(videosTable)
      .leftJoin(vlogCategoriesTable, eq(videosTable.categoryId, vlogCategoriesTable.id))
      .where(eq(videosTable.id, id))
      .limit(1);

    if (!videoData[0] || !videoData[0].isPublished) {
      return null;
    }

    return videoData[0];
  } catch {
    return null;
  }
}

export default async function VlogDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const searchParamsValue = await searchParams;

  // 检查是否有预获取的数据
  const prefetchData = searchParamsValue.data as string | undefined;
  const isPrefetch = searchParamsValue.prefetch === 'true';

  let video;

  if (isPrefetch && prefetchData) {
    try {
      // 使用传递过来的数据
      video = JSON.parse(prefetchData);
    } catch {
      // 如果解析失败，回退到服务器请求
      video = await getVideoData(id);
    }
  } else {
    // 直接访问详情页时的服务器请求
    video = await getVideoData(id);
  }

  if (!video) {
    notFound();
  }

  return <VideoDetailClient video={video} />;
}