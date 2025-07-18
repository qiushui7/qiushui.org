import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
