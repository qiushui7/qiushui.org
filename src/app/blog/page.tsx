import { getAllPosts, getBlogStats } from '@/app/lib/blog';
import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Blog | qiushui',
  description: 'Thoughts, tutorials, and insights about web development',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const stats = getBlogStats();

  const blogData = {
    posts,
    stats,
  };

  return <BlogPageClient blogData={blogData} />;
}