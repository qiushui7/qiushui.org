import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.qiushui.org'
      }
    ]
  }
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
