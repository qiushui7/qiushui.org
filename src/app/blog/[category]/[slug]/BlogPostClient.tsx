'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import { ReactNode, useState, useEffect } from 'react';
import ViewCounter from '@/components/ViewCounter';

interface BlogPostClientProps {
    post: BlogPost;
    mdxContent: ReactNode;
}

export default function BlogPostClient({ post, mdxContent }: BlogPostClientProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="min-h-screen" />;
    }

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-30">
                {/* Back Navigation and Category */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Blog
                    </Link>
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                        {post.category}
                    </span>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    className="mb-8"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            {post.author && (
                                <>
                                    <span>By {post.author}</span>
                                </>
                            )}
                            <span>{new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                            {post.location && (
                                <>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {post.location}
                                    </span>
                                </>
                            )}
                            <ViewCounter slug={post.slug} category={post.category} />
                        </div>

                        {post.tags && post.tags.length > 0 && (
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
                    </div>
                </motion.header>

                {/* Article Content */}
                <motion.article
                    className="mdx-content relative bg-black/20 backdrop-blur-sm rounded-2xl pt-6 px-8 pb-2 border border-white/10"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {mdxContent}
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

