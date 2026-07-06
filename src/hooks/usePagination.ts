import { useCallback, useState } from "react";

type Options = {
  initialPage?: number;
  initialLimit?: number;
};

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
}: Options = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const next = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  const previous = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  const setPageSafe = useCallback((p: number) => {
    setPage(Math.max(1, p));
  }, []);

  return {
    page,
    limit,

    setPage: setPageSafe,
    setLimit,

    next,
    previous,
    reset,
  };
}
