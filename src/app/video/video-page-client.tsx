'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Video } from '@/lib/db';
import VlogPostsWithViews from '@/components/videos-with-views';

interface VideoData {
  videos: Array<Video & { categoryName: string | null, categorySlug: string | null }>,
  stats: {
    totalVideos: number,
    totalCategories: number,
    categories: Array<{ id: string, name: string, slug: string, count: number }>
  }
}

interface VideoPageClientProps {
  videoData: VideoData
}

export default function VideoPageClient({ videoData }: VideoPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVideos = videoData.videos.filter(
    (video) => selectedCategory === 'all' || video.categoryId === selectedCategory
  );

  if (videoData.videos.length === 0) {
    return (
      <div className="min-h-screen text-white py-20 relative z-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Video</h1>
          <p className="text-gray-400">No videos found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-40 relative z-20">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">VIDEO</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Sharing my journey, thoughts, and experiences through videos
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === 'all'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All ({videoData.videos.length})
          </button>
          {videoData.stats.categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${selectedCategory === category.id
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        <VlogPostsWithViews videos={videoData.videos} selectedCategory={selectedCategory} />

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No videos found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
