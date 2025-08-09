'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/app/lib/blog';

interface BlogData {
  posts: BlogPost[];
  stats: {
    totalPosts: number;
    totalCategories: number;
    categories: Array<{
      name: string;
      count: number;
    }>;
  };
}

interface BlogPageClientProps {
  blogData: BlogData;
}

export default function BlogPageClient({ blogData }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = blogData.posts.filter(post =>
    selectedCategory === 'all' || post.category === selectedCategory
  );

  console.log('BlogPageClient rendered with:', {
    totalPosts: blogData?.posts?.length,
    filteredPosts: filteredPosts.length,
    categories: blogData?.stats?.categories
  });

  // Handle empty data
  if (!blogData || !blogData.posts || blogData.posts.length === 0) {
    return (
      <div className="min-h-screen text-white py-20 relative z-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-gray-400">No blog posts found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-40 relative z-20">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">BLOG</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Thoughts, tutorials, and insights about web development
          </p>

          {/* Stats */}
          {/* <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-bold">{blogData.stats.totalPosts}</div>
              <div className="text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{blogData.stats.totalCategories}</div>
              <div className="text-gray-500">Categories</div>
            </div>
          </div> */}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === 'all'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
              }`}
          >
            All ({blogData.posts.length})
          </button>
          {blogData.stats.categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${selectedCategory === category.name
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {getCategoryDisplayName(category.name)} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={`${post.category}-${post.slug}`}
              className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {getCategoryDisplayName(post.category)}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                    {post.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {post.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors"
              >
                Read More →
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get display name for categories
function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'design': 'UI/UX Design',
    'miscellaneous-notes': 'Notes'
  };

  return categoryMap[category] || category;
}