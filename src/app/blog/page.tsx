import { getAllPosts, getBlogStats } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Blog | qiushui',
  description: 'Thoughts, tutorials, and insights about web development',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const stats = await getBlogStats();

  const blogData = {
    posts,
    stats,
  };

  return <BlogPageClient blogData={blogData} />;
}