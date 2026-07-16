import { useEffect, useRef, useState } from "react";
import type { usePaginationReturnType } from "../usePagination";

type Mode = "page" | "infinite";

export function useListItems<T>({
  data,
  mode,
  queryKey,
  pagination,
}: {
  data?: {
    items: T[];
  } | null;
  mode: Mode;
  queryKey: string;
  pagination: usePaginationReturnType;
}) {
  const [items, setItems] = useState<T[]>([]);
  const previousQueryKey = useRef(queryKey);

  useEffect(() => {
    if (previousQueryKey.current === queryKey) return;

    previousQueryKey.current = queryKey;
    setItems([]);
    pagination.reset();
  }, [queryKey, pagination]);


  useEffect(() => {
    if (!data) return;

    if (mode === "page") {
      setItems(data.items);
      return;
    }

    if (queryKey !== previousQueryKey.current) {
      return;
    }

    if (pagination.page === 1) {
      setItems(data.items);
    } else {
      setItems(prev => [...prev, ...data.items]);
    }
  }, [data, mode]);
  return items;

}

