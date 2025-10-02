'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import BlogPostsWithViews from '@/components/BlogPostsWithViews';

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
        <BlogPostsWithViews posts={blogData.posts} selectedCategory={selectedCategory} />

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