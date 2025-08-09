import { codeToHtml } from 'shiki';
import { transformerNotationHighlight, transformerMetaHighlight } from '@shikijs/transformers'
import CodeBlockClient from './CodeBlockClient';

interface MDXCodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  highlightLines?: number[];
  filename?: string;
}

export default async function MDXCodeBlock({
  children,
  language = 'text',
  title,
  filename
}: MDXCodeBlockProps) {
  // Clean up the code content and normalize indentation

  let code = typeof children === 'string' ? children.trim() : String(children).trim();


  // Detect the minimum indentation and remove it to normalize the code block
  const lines = code.split('\n');

  if (lines.length > 0) {
    const minIndent = Math.min(
      ...lines.map(line => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      })
    );

    if (minIndent > 0) {
      code = lines.map(line =>
        line.trim().length === 0 ? line : line.slice(minIndent)
      ).join('\n');
    }
  }

  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
      defaultColor: false,
      cssVariablePrefix: '--shiki-',
      transformers: [
        transformerNotationHighlight(),
        transformerMetaHighlight()
      ]
    });

    return (
      <div className="my-8">
        {/* Title or filename header */}
        {(title || filename) && (
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border border-gray-700 border-b-0">
            {title && <span className="font-semibold">{title}</span>}
            {filename && (
              <span className="text-gray-400">
                {title ? ` - ${filename}` : filename}
              </span>
            )}
          </div>
        )}

        <CodeBlockClient
          html={html}
          code={code}
          language={language}
          hasHeader={!!(title || filename)}
        />
      </div>
    );
  } catch (error) {
    console.error('Shiki highlighting error:', error);

    // Fallback to simple pre/code block
    return (
      <div className="my-8">
        {(title || filename) && (
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border border-gray-700 border-b-0">
            {title && <span className="font-semibold">{title}</span>}
            {filename && (
              <span className="text-gray-400">
                {title ? ` - ${filename}` : filename}
              </span>
            )}
          </div>
        )}

        <div className="relative group">
          {language !== 'text' && !title && !filename && (
            <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-3 py-1 text-xs font-mono rounded-bl-md rounded-tr-lg z-10">
              {language}
            </div>
          )}

          <pre className={`bg-gray-900 border border-gray-700 p-4 overflow-x-auto ${title || filename ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'
            }`}>
            <code className="text-gray-300 font-mono text-sm">
              {code}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}