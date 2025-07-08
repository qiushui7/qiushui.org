'use client';

import { useState, useEffect } from 'react';
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

export default function BlogPage() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      const response = await fetch('/api/blog');
      const result = await response.json();
      
      if (result.success) {
        setBlogData(result.data);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = blogData?.posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">MY</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">BLOG</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Thoughts, tutorials, and insights about web development
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-bold">{blogData?.stats.totalPosts}</div>
              <div className="text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{blogData?.stats.totalCategories}</div>
              <div className="text-gray-500">Categories</div>
            </div>
          </div>
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
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All ({blogData?.posts.length})
          </button>
          {blogData?.stats.categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${
                selectedCategory === category.name
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={`${post.category}-${post.slug}`}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

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