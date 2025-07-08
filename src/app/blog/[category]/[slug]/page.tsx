'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/app/lib/blog';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.category && params.slug) {
      fetchPost();
    }
  }, [params]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.category}/${params.slug}`);
      const result = await response.json();
      
      if (result.success) {
        setPost(result.data);
      } else {
        setError(result.error || 'Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link 
            href="/blog" 
            className="bg-white text-black px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            ← Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Article Content */}
        <motion.article
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="mdx-content"
            dangerouslySetInnerHTML={{ __html: formatMarkdownContent(post.content) }}
          />
        </motion.article>

        {/* Navigation Footer */}
        <motion.footer
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <Link 
              href="/blog" 
              className="bg-white text-black px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

// Simple markdown to HTML conversion
function formatMarkdownContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-semibold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8">$1</h1>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto my-6"><code class="text-gray-300">$2</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">$1</code>')
    
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
    
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 transition-colors underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists
    .replace(/^\- (.*)$/gim, '<li class="mb-2">$1</li>')
    .replace(/^\d+\. (.*)$/gim, '<li class="mb-2">$1</li>')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^/, '<p class="mb-4">')
    .replace(/$/, '</p>')
    
    // Clean up empty paragraphs
    .replace(/<p class="mb-4"><\/p>/g, '');
} 