import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Load views data
function getViewsData(): Record<string, number> {
  try {
    const viewsPath = path.join(process.cwd(), 'data/views.json');
    if (fs.existsSync(viewsPath)) {
      const viewsData = fs.readFileSync(viewsPath, 'utf8');
      return JSON.parse(viewsData);
    }
  } catch (error) {
    console.error('Error reading views data:', error);
  }
  return {};
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
export function getPostsByCategory(category: string): BlogPost[] {
  try {
    const categoryPath = path.join(blogDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const fileNames = fs.readdirSync(categoryPath)
      .filter(name => name.endsWith('.mdx'));

    const viewsData = getViewsData();

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
export function getAllPosts(): BlogPost[] {
  const categories = getBlogCategories();
  const allPosts: BlogPost[] = [];

  categories.forEach(category => {
    const posts = getPostsByCategory(category);
    allPosts.push(...posts);
  });

  // Sort by date (newest first)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a specific post by category and slug
export function getPostBySlug(category: string, slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, category, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const viewsData = getViewsData();
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
export function getBlogStats() {
  const categories = getBlogCategories();
  const stats = categories.map(category => {
    const posts = getPostsByCategory(category);
    return {
      name: category,
      count: posts.length,
      posts,
    };
  });

  const totalPosts = stats.reduce((total, category) => total + category.count, 0);

  return {
    totalPosts,
    totalCategories: categories.length,
    categories: stats,
  };
} 