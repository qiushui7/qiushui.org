'use client';

import { useState, useEffect } from 'react';

interface ViewCounterProps {
  slug: string,
  category: string
}

export default function ViewCounter({ slug, category }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postId = `${category}/${slug}`;

    // 获取当前浏览量
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${encodeURIComponent(postId)}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('Failed to fetch views:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 增加浏览量
    const incrementViews = async () => {
      // 检查是否已经在本次会话中浏览过
      const viewedKey = `viewed_${postId}`;
      const hasViewed = sessionStorage.getItem(viewedKey);

      if (!hasViewed) {
        try {
          const response = await fetch(`/api/views/${encodeURIComponent(postId)}`, {
            method: 'POST'
          });

          if (response.ok) {
            const data = await response.json();
            setViews(data.views);
            // 标记为已浏览，避免重复计数
            sessionStorage.setItem(viewedKey, 'true');
          }
        } catch (error) {
          console.error('Failed to increment views:', error);
        }
      }
    };

    fetchViews();

    // 延迟增加浏览量，确保不是误触
    const timer = setTimeout(() => {
      incrementViews();
    }, 2000);

    return () => clearTimeout(timer);
  }, [slug, category]);

  if (isLoading) {
    return (
      <span className="text-gray-400 text-sm flex items-center gap-1">
        <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        <span className="w-8 h-4 bg-gray-600 animate-pulse rounded" />
      </span>
    );
  }

  return (
    <span className="text-gray-400 text-sm flex items-center gap-1">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
      <span>{views.toLocaleString()} views</span>
    </span>
  );
}
