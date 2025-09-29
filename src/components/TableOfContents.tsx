'use client';

import { useEffect, useState, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 获取所有标题元素
    const headings = document.querySelectorAll('.mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6');

    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      // 为没有 id 的标题添加 id
      if (!heading.id) {
        const text = heading.textContent || '';
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '') // 移除特殊字符
          .replace(/\s+/g, '-') // 将空格替换为短横线
          .trim() + `-${index}` || `heading-${index}`;
          
        heading.id = id;
      }

      tocItems.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setToc(tocItems);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // 观察所有标题
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  // Auto-scroll TOC to active item
  useEffect(() => {
    if (activeId && navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeButton) {
        const nav = navRef.current;
        const navRect = nav.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        // Check if the active button is outside the visible area
        if (buttonRect.top < navRect.top || buttonRect.bottom > navRect.bottom) {
          // Calculate the scroll position to center the active item
          const buttonOffsetTop = (activeButton as HTMLElement).offsetTop;
          const navHeight = nav.clientHeight;
          const buttonHeight = activeButton.clientHeight;

          const scrollTo = buttonOffsetTop - navHeight / 2 + buttonHeight / 2;

          nav.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeId]);

  // Prevent external scroll when scrolling within TOC
  const handleWheelEvent = (e: React.WheelEvent) => {
    const nav = navRef.current;
    if (!nav) return;

    const { scrollTop, scrollHeight, clientHeight } = nav;
    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    // Check if we're at the top or bottom of the nav
    const isAtTop = scrollTop <= 1; // Small tolerance for edge cases
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Always prevent external scroll when interacting with TOC
    e.stopPropagation();

    // Handle scroll within the nav manually
    if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
      nav.scrollTop += e.deltaY * 0.5; // Smoother scrolling with reduced speed
    }
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={`h-[80vh] ${className}`}>
      <div className="backdrop-blur-sm rounded-sm p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2 flex-shrink-0">
          On this page
        </h3>
        <nav
          ref={navRef}
          className="flex-1 overflow-y-auto"
          onWheel={handleWheelEvent}
        >
          <ul className="space-y-1">
            {toc.map(({ id, text, level }) => (
              <li key={id}>
                <button
                  data-id={id}
                  onClick={() => scrollToHeading(id)}
                  className={`
                    block w-full text-left text-sm transition-colors duration-200 py-1 px-2 rounded cursor-pointer
                    ${activeId === id
                      ? 'text-white bg-white/10 font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                  style={{
                    paddingLeft: `${(level - 1) * 12 + 8}px`
                  }}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}