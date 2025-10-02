'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Video } from '@/lib/db';
import { formatDistance } from 'date-fns';

interface VlogPostsWithViewsProps {
  videos: Array<Video & { categoryName: string | null; categorySlug: string | null }>;
  selectedCategory: string;
}

export default function VlogPostsWithViews({ videos, selectedCategory }: VlogPostsWithViewsProps) {
  const filteredVideos = videos.filter(
    (video) => selectedCategory === 'all' || video.categoryId === selectedCategory
  );

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVideos.map((video, index) => {
        console.log(video.viewCount);
        
        const views = video.viewCount || 0;

        return (
          <Link key={video.id} href={`/video/${video.id}`}>
            <motion.article
              className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:bg-white/15 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover="hover"
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                {video.thumbnailUrl ? (
                  <motion.div className="w-full h-full" variants={{ hover: { scale: 1.05 } }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
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

                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                  </div>
                </div> */}

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {video.categoryName || 'Uncategorized'}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {formatDistance(new Date(video.publishedAt || ''), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer - Views only */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors">Watch Now →</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>{views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </div>
  );
}