import { notFound } from 'next/navigation';
import { getPostBySlug, getBlogCategories, getPostsByCategory } from '@/lib/blog';
import BlogPostClient from './blog-post-client';
import MDXContent from '@/components/mdx-content';
import type { WebSite, WithContext } from 'schema-dts';

interface BlogPostPageProps {
  params: Promise<{
    category: string,
    slug: string
  }>
}

// Generate static params for all blog posts
export function generateStaticParams() {
  const categories = getBlogCategories();

  const categoryPromises = categories.map(category => getPostsByCategory(category));
  const postsResults = categoryPromises;

  const params: Array<{ category: string, slug: string }> = [];

  postsResults.forEach((posts, index) => {
    const category = categories[index];
    posts.forEach(post => {
      params.push({
        category,
        slug: post.slug
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | qiushui`,
    description: post.excerpt || `${post.title} - A blog post by ${post.author}`,
    alternates: {
      canonical: `/blog/${category}/${slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - A blog post by ${post.author}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: `https://www.qiushui.org/api/og?title=${post.title}&description=${post.excerpt}`,
      siteName: 'qiushui.org',
      url: `https://www.qiushui.org/blog/${category}/${slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `${post.title} - A blog post by ${post.author}`,
      images: `https://www.qiushui.org/api/og?title=${post.title}&description=${post.excerpt}`
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: post.title,
    url: `https://www.qiushui.org/blog/${category}/${slug}`,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Person',
      name: post.author
    },
    keywords: post.tags,
    datePublished: post.date,
    mainEntityOfPage: {
      '@type': 'WebSite',
      url: `https://www.qiushui.org/blog/${category}/${slug}`
    }
  };

  return (
    <>
      <script
        id="json-ld-blog-post"
        type="application/ld+json"
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} mdxContent={<MDXContent source={post.content} />} />;
    </>
  );
}
