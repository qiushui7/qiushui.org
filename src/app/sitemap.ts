import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string,
  category: string,
  date: string
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src', 'blog');
  const categories = fs.readdirSync(blogDir, { withFileTypes: true })
    .reduce<string[]>((acc, dirent) => {
      if (dirent.isDirectory()) {
        acc.push(dirent.name);
      }
      return acc;
    }, []);

  const posts: BlogPost[] = [];

  categories.forEach(category => {
    const categoryDir = path.join(blogDir, category);
    const files = fs.readdirSync(categoryDir)
      .filter(file => file.endsWith('.mdx'));

    files.forEach(file => {
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      posts.push({
        slug: file.replace('.mdx', ''),
        category,
        date: data.date || new Date().toISOString()
      });
    });
  });

  return posts;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.qiushui.org';
  const posts = getBlogPosts();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }
  ];

  const categoryRoutes = [
    'miscellaneous-notes',
    'reading-notes',
    'interview-experience'
  ].map(category => ({
    url: `${baseUrl}/blog/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  const postRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
