'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video } from '@/lib/db';
import { formatDistance } from 'date-fns';

interface VideoDetailClientProps {
  video: Video & { categoryName: string | null; categorySlug: string | null };
}

export default function VideoDetailClient({ video }: VideoDetailClientProps) {
  const [views, setViews] = useState(video.viewCount || 0);

  // 增加浏览量
  const incrementViews = async () => {
    // 检查是否已经在本次会话中浏览过
    const viewedKey = `viewed_${video.id}`;
    const hasViewed = sessionStorage.getItem(viewedKey);
    
    if (!hasViewed) {
      try {
        const response = await fetch(`/api/videos/${encodeURIComponent(video.id)}/views`, {
          method: 'POST',
        });
        
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
          // 标记为已浏览，避免重复计数
          sessionStorage.setItem(viewedKey, 'true');
        }
      } catch (error) {
        console.error('Failed to increment views:', error);
      }
    }
  };

  useEffect(() => {
    incrementViews();
  }, [video.id]);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getVideoEmbedUrl = (url: string): string => {
    // Handle YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Handle Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    // Return original URL for other video sources
    return url;
  };

  return (
    <div className="min-h-screen text-white relative">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Back Button */}
        <motion.div
          className="mb-8 relative z-60"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/video"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Video
          </Link>
        </motion.div>

        <div className="grid grid-cols-1">
          {/* todo: use player component */}
          {/* Video Player */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <iframe
                src={getVideoEmbedUrl(video.videoUrl)}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Video Title and Meta */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{video.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>{views.toLocaleString()} views</span>
                </div>

                <span>•</span>

                <span>
                  {formatDistance(new Date(video.publishedAt), new Date(), { addSuffix: true })}
                </span>

                {video.duration && (
                  <>
                    <span>•</span>
                    <span>{formatDuration(video.duration)}</span>
                  </>
                )}
              </div>

              {video.categoryName && (
                <div className="mb-4">
                  <span className="inline-block bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {video.categoryName}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {video.description && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">About this video</h2>
                <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}