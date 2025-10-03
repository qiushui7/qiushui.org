'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/blog';
import { format } from 'date-fns/format';

interface BlogPostsWithViewsProps {
  posts: BlogPost[],
  selectedCategory: string
}

export default function BlogPostsWithViews({ posts, selectedCategory }: BlogPostsWithViewsProps) {
  const [viewsData, setViewsData] = useState<Record<string, number>>({});
  const [isLoadingViews, setIsLoadingViews] = useState(true);

  const filteredPosts = posts.filter(post => selectedCategory === 'all' || post.category === selectedCategory);

  useEffect(() => {
    const fetchAllViews = async () => {
      try {
        const response = await fetch('/api/views/all');
        if (response.ok) {
          const data = await response.json();
          setViewsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch views data:', error);
      } finally {
        setIsLoadingViews(false);
      }
    };

    fetchAllViews();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post, index) => {
        const postId = `${post.category}/${post.slug}`;
        const views = viewsData[postId] || 0;

        return (
          <motion.article
            key={postId}
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 h-full flex flex-col"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="mb-4 flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {getCategoryDisplayName(post.category)}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                  {/* {post.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {post.location}
                      </span>
                    </>
                  )} */}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-400 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </div>

            {post.tags.length > 0 && (
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

            <div className="flex items-center justify-between">
              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors"
              >
                Read More →
              </Link>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {isLoadingViews
                  ? (
                    <>
                      <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="w-6 h-3 bg-gray-600 animate-pulse rounded" />
                    </>
                  )
                  : (
                    <>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>{views}</span>
                    </>
                  )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

// Helper function to get display name for categories
function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    design: 'UI/UX Design',
    'miscellaneous-notes': 'Notes',
    'interview-experience': 'Interview',
    'reading-notes': 'Reading'
  };

  return categoryMap[category] || category;
}
