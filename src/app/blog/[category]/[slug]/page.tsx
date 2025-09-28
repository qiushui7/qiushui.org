import { notFound } from 'next/navigation';
import { getPostBySlug, getBlogCategories, getPostsByCategory } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';
import MDXContent from '@/components/MDXContent';

interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const categories = getBlogCategories();
  const params: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const posts = await getPostsByCategory(category);
    posts.forEach(post => {
      params.push({
        category,
        slug: post.slug,
      });
    });
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | qiushui`,
    description: post.excerpt || `${post.title} - A blog post by ${post.author}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - A blog post by ${post.author}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} mdxContent={<MDXContent source={post.content} />} />;
}

