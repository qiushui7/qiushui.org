import Link from 'next/link';
import Image from 'next/image';
import { getLatestBlogs } from '@/lib/blog';
import { db, videos as videosTable } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { formatDate } from 'date-fns/format';
import type { Video } from '@/lib/db/schema';

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

async function getLatestVideo(): Promise<Video | null> {
  try {
    const latestVideo = await db
      .select({
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
        isPublished: videosTable.isPublished
      })
      .from(videosTable)
      .where(eq(videosTable.isPublished, true))
      .orderBy(desc(videosTable.publishedAt))
      .limit(1);

    return latestVideo[0] || null;
  } catch {
    return null;
  }
}

export default async function Recommendation() {
  const latestBlogs = getLatestBlogs(3);
  const latestVideo = await getLatestVideo();

  if (latestBlogs.length === 0 && !latestVideo) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Animation */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-black-700/50 to-black-800/50 border border-white/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">Latest Content</span>
          </div>
        </div>

        {/* Creative Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
          {/* Video Post - Takes larger space */}
          {latestVideo && (
            <div className="lg:col-span-7 h-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden transition-all duration-300 group flex flex-col">
              <div className="group block h-full relative">
                <div className="relative h-full">
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-4 mt-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full" />
                        <span className="text-gray-300 font-medium text-sm tracking-wider">VIDEO</span>
                      </div>
                      <Link href="/video" className="text-sm relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full">
                        View all videos
                      </Link>
                    </div>
                    {/* Video Thumbnail */}
                    <Link href={`/video/${latestVideo.id}`}>
                      <div className="relative aspect-video bg-gray-800 overflow-hidden">
                        {latestVideo.thumbnailUrl
                          ? (
                            <div className="w-full h-full">
                              <Image
                                src={latestVideo.thumbnailUrl}
                                alt={latestVideo.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                          : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            </div>
                          )}

                        {/* Duration Badge */}
                        {typeof latestVideo.duration === 'number' && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(latestVideo.duration)}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="px-4 mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300 my-2 leading-tight">
                        {latestVideo.title}
                      </h3>
                      {latestVideo.description && (
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {latestVideo.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto pb-4 px-4">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">
                          {formatDate(latestVideo.publishedAt, 'MMM d, yyyy')}
                        </p>
                        <Link href={`/video/${latestVideo.id}`} className="text-sm relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full">
                          Watch
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts - Display latest 3 */}
          {latestBlogs.length > 0 && (
            <div className="lg:col-span-5 h-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-4 mt-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full" />
                  <span className="text-gray-300 font-medium text-sm tracking-wider">LATEST BLOGS</span>
                </div>
                <Link href="/blog" className="text-sm relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full">
                  View all blogs
                </Link>
              </div>

              <div className="flex-1 px-4 space-y-6">
                {latestBlogs.map((blog) => (
                  <Link
                    key={`${blog.category}-${blog.slug}`}
                    href={`/blog/${blog.category}/${blog.slug}`}
                    className="group block"
                  >
                    <div className="bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-lg p-4 transition-all duration-300">
                      <h3 className="text-white font-semibold text-2xl mb-2 line-clamp-1 group-hover:text-gray-100 transition-colors">
                        {blog.title}
                      </h3>

                      {blog.excerpt && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {blog.tags && blog.tags.length > 0 && (
                            <span className="px-2 py-1 text-xs bg-gray-700/60 text-gray-300 rounded">
                              #{blog.tags[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs">
                          {formatDate(new Date(blog.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
