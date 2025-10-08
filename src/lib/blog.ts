import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/blog');

export interface BlogPost {
  slug: string,
  category: string,
  title: string,
  date: string,
  author: string,
  excerpt: string,
  tags: string[],
  content: string,
  location?: string,
  views?: number
}

export interface BlogCategory {
  name: string,
  count: number,
  posts: BlogPost[]
}

// Get all categories
export function getBlogCategories(): string[] {
  try {
    return fs.readdirSync(blogDirectory, { withFileTypes: true })
      .reduce<string[]>((acc, dirent) => {
        if (dirent.isDirectory()) {
          acc.push(dirent.name);
        }
        return acc;
      }, []);
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

    const posts = fileNames.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

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
        views: 0
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

  for (const category of categories) {
    const posts = getPostsByCategory(category);
    allPosts.push(...posts);
  }

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
      views: 0
    };
  } catch (error) {
    console.error(`Error reading post ${category}/${slug}:`, error);
    return null;
  }
}

// Get blog statistics
export function getBlogStats() {
  const categories = getBlogCategories();
  const stats = [];

  for (const category of categories) {
    const posts = getPostsByCategory(category);
    stats.push({
      name: category,
      count: posts.length,
      posts
    });
  }

  const totalPosts = stats.reduce((total, category) => total + category.count, 0);

  return {
    totalPosts,
    totalCategories: categories.length,
    categories: stats
  };
}

export function getLatestBlog(): BlogPost | null {
  const allPosts = getAllPosts();
  return allPosts.length > 0 ? allPosts[0] : null;
}

export function getLatestBlogs(count = 3): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, count);
}
