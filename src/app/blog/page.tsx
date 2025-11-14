import { getAllPosts, getBlogStats } from '@/lib/blog';
import BlogPageClient from './blog-page-client';

export const metadata = {
  title: 'Blog | qiushui',
  description: 'Thoughts, tutorials, and insights about web development',
  alternates: {
    canonical: '/blog'
  }
};

export const revalidate = 60;

export default function BlogPage() {
  const [posts, stats] = [
    getAllPosts(),
    getBlogStats()
  ];

  const blogData = {
    posts,
    stats
  };

  return <BlogPageClient blogData={blogData} />;
}
