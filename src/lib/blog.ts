import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { supabase } from './supabase';

// Load views data from Supabase
async function getViewsData(): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .from('post_views')
      .select('post_id, views');
    
    if (error) {
      console.error('Error reading views data from Supabase:', error);
      return {};
    }
    
    const viewsMap: Record<string, number> = {};
    data?.forEach(item => {
      viewsMap[item.post_id] = item.views;
    });
    
    return viewsMap;
  } catch (error) {
    console.error('Error reading views data:', error);
    return {};
  }
}

const blogDirectory = path.join(process.cwd(), 'src/blog');

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  content: string;
  location?: string;
  views?: number;
}

export interface BlogCategory {
  name: string;
  count: number;
  posts: BlogPost[];
}

// Get all categories
export function getBlogCategories(): string[] {
  try {
    const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return categories;
  } catch (error) {
    console.error('Error reading blog categories:', error);
    return [];
  }
}

// Get all posts from a specific category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const categoryPath = path.join(blogDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const fileNames = fs.readdirSync(categoryPath)
      .filter(name => name.endsWith('.mdx'));

    const viewsData = await getViewsData();

    const posts = fileNames.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const postKey = `${category}/${slug}`;
      const views = viewsData[postKey] || 0;

      return {
        slug,
        category,
        title: data.title || slug,
        date: data.date || '',
        author: data.author || 'qiushui',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content,
        location: data.location,
        views,
      };
    });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading posts from category ${category}:`, error);
    return [];
  }
}

// Get all posts from all categories
export async function getAllPosts(): Promise<BlogPost[]> {
  const categories = getBlogCategories();
  const allPosts: BlogPost[] = [];

  for (const category of categories) {
    const posts = await getPostsByCategory(category);
    allPosts.push(...posts);
  }

  // Sort by date (newest first)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a specific post by category and slug
export async function getPostBySlug(category: string, slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, category, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const viewsData = await getViewsData();
    const postKey = `${category}/${slug}`;
    const views = viewsData[postKey] || 0;

    return {
      slug,
      category,
      title: data.title || slug,
      date: data.date || '',
      author: data.author || 'qiushui',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
      location: data.location,
      views,
    };
  } catch (error) {
    console.error(`Error reading post ${category}/${slug}:`, error);
    return null;
  }
}

// Get blog statistics
export async function getBlogStats() {
  const categories = getBlogCategories();
  const stats = [];

  for (const category of categories) {
    const posts = await getPostsByCategory(category);
    stats.push({
      name: category,
      count: posts.length,
      posts,
    });
  }

  const totalPosts = stats.reduce((total, category) => total + category.count, 0);

  return {
    totalPosts,
    totalCategories: categories.length,
    categories: stats,
  };
} 