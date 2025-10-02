import VideoPageClient from './VideoPageClient';
import { db, videos as videosTable, vlogCategories as vlogCategoriesTable } from '@/lib/db';
import { desc, eq, count } from 'drizzle-orm';

export const metadata = {
  title: 'Videos | qiushui',
  description: 'Video blogs sharing my journey, thoughts, and experiences',
};

async function getVideoData() {
  const videos = await db.select({
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
    isPublished: videosTable.isPublished,
    categoryName: vlogCategoriesTable.name,
    categorySlug: vlogCategoriesTable.slug,
  }).from(videosTable)
    .leftJoin(vlogCategoriesTable, eq(videosTable.categoryId, vlogCategoriesTable.id))
    .where(eq(videosTable.isPublished, true))
    .orderBy(desc(videosTable.publishedAt));

  const categories = await db.select({
    id: vlogCategoriesTable.id,
    name: vlogCategoriesTable.name,
    slug: vlogCategoriesTable.slug,
    count: count(videosTable.id)
  }).from(vlogCategoriesTable)
    .leftJoin(videosTable, eq(vlogCategoriesTable.id, videosTable.categoryId))
    .groupBy(vlogCategoriesTable.id, vlogCategoriesTable.name, vlogCategoriesTable.slug);

  return {
    videos,
    stats: {
      totalVideos: videos.length,
      totalCategories: categories.length,
      categories,
    },
  };
}

export default async function VideoPage() {
  const videoData = await getVideoData();
  return <VideoPageClient videoData={videoData} />;
}