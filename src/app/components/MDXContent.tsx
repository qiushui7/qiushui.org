import { MDXRemote } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';
import MDXCodeBlock from './MDXCodeBlock';

// Custom components for MDX
const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold mt-12 mb-8 text-white">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-semibold mt-10 mb-6 text-white">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-xl font-semibold mt-6 mb-3 text-white">
      {children}
    </h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mb-4 text-gray-300 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="mb-4 space-y-2 text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="mb-4 space-y-2 text-gray-300 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="mb-2 text-gray-300">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 my-6 italic text-gray-400">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: ReactNode; className?: string }) => {
    // Otherwise it's inline code
    return (
      <code className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: ReactNode }) => {
    // Fallback for regular pre blocks
    return (
      <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-gray-300 font-mono text-sm">
          {children}
        </code>
      </pre>
    );
  },
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 transition-colors underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic text-gray-300">
      {children}
    </em>
  ),
  hr: () => (
    <hr className="border-gray-700 my-8" />
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gray-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="bg-gray-900">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b border-gray-700">
      {children}
    </tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-4 py-2 text-left text-gray-300 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-4 py-2 text-gray-300">
      {children}
    </td>
  ),
  // Custom components for direct use in MDX
  CodeBlock: MDXCodeBlock,
};

interface MDXContentProps {
  source: string;
}

export default async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}