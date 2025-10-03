'use client';

import { useEffect, useState, useRef } from 'react';

interface TOCItem {
  id: string,
  text: string,
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isWheelEvent, setIsWheelEvent] = useState(false);
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
          .replaceAll(/[^\s\w-]/g, '') // 移除特殊字符
          .replaceAll(/\s+/g, '-') // 将空格替换为短横线
          .trim() + `-${index}` || `heading-${index}`;

        heading.id = id;
      }

      tocItems.push({
        id: heading.id,
        text: heading.textContent || '',
        level: Number.parseInt(heading.tagName.charAt(1), 10)
      });
    });

    setToc(tocItems);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isWheelEvent) return;
        // 获取所有 intersecting 的标题
        const visibleHeadings = entries
          .reduce<Array<{ id: string, top: number }>>((acc, entry) => {
            if (entry.isIntersecting) {
              acc.push({
                id: entry.target.id,
                top: entry.boundingClientRect.top
              });
            }
            return acc;
          }, [])
          .sort((a, b) => a.top - b.top); // 按距离顶部的距离排序
        // 如果有可见的标题，选择最靠近顶部的一个
        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].id);
        }
      },
      {
        rootMargin: '0px 0px -90% 0px',
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
  }, [toc, isWheelEvent]);

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
            behavior: 'instant'
          });
        }
      }
    }
  }, [activeId]);

  // Prevent external scroll when scrolling within TOC
  const handleWheelEvent = (e: React.WheelEvent) => {
    const nav = navRef.current;
    if (!nav) return;
    e.stopPropagation();
  };

  const scrollToHeading = (id: string) => {
    setIsWheelEvent(true);
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'instant',
        block: 'start'
      });
    }
    const timer = setTimeout(() => {
      setIsWheelEvent(false);
      clearTimeout(timer);
    }, 3000);
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
                  type="button"
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
