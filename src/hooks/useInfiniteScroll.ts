import { useEffect, useRef } from "react";

type Options = {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
};

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  threshold = 0.9,
}: Options) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef({
    loading,
    hasMore,
  });

  useEffect(() => {
    stateRef.current.loading = loading;
    stateRef.current.hasMore = hasMore;
  }, [loading, hasMore]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const { loading, hasMore } = stateRef.current;

      if (loading || !hasMore) return;

      onLoadMore();
    }, { threshold });

    observer.observe(target);

    return () => observer.disconnect();
  }, [onLoadMore, threshold]);

  return targetRef;
}
