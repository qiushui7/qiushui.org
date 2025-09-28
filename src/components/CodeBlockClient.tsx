'use client';

import { useState } from 'react';

interface CodeBlockClientProps {
  html: string;
  code: string;
  language: string;
  hasHeader?: boolean;
}

export default function CodeBlockClient({ html, code, language, hasHeader = false }: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      {/* Language label - only show if no header */}
      {language !== 'text' && !hasHeader && (
        <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-3 py-1 text-xs font-mono rounded-bl-md rounded-tr-lg z-10">
          {language}
        </div>
      )}

      {/* Copy button */}
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-md text-xs z-20"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect>
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
          </svg>
        )}
      </button>

      {/* Code content */}
      <div
        className={`shiki-container overflow-x-auto border border-gray-700 ${hasHeader ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'
          }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}