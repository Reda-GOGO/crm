import { useCallback, useEffect, useState } from "react";

type Mode = "page" | "infinite";

export function useListItems<T>({
  data,
  mode,
  page,
  queryKey,
  activeQueryKey,
  resetCount,
}: {
  data?: {
    items: T[];
  } | null;
  mode: Mode;
  page: number;
  queryKey: string;
  activeQueryKey: React.RefObject<string>;
  resetCount: number;
}) {
  const [items, setItems] = useState<T[]>([]);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  useEffect(() => {
    clearItems();
  }, [resetCount, clearItems]);

  useEffect(() => {
    if (!data) return;

    if (mode === "page") {
      setItems(data.items);
      return;
    }

    if (queryKey !== activeQueryKey.current) {
      return;
    }

    setItems((previous) =>
      page === 1
        ? data.items
        : [...previous, ...data.items]
    );
  }, [
    data,
    mode,
    page,
    queryKey,
    activeQueryKey,
  ]);

  return {
    items,
    clearItems,
  };
}
