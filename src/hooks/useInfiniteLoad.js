import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteLoad(items, pageSize = 24) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + pageSize, items.length));
  }, [items.length, pageSize]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, visibleCount, items.length]);

  return {
    visibleItems: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    sentinelRef,
    loadMore,
  };
}
