import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { http } from "@/infrastructure/http";
import { useFilters } from "./useFilters";
import { usePagination } from "./usePagination";
import { useQuery, type queryResponse } from "./useQuery";
import { useSearch } from "./useSearch";
import { useSelection } from "./useSelection";

type Mode = "page" | "infinite";
export type useListReturnType<T> = ReturnType<typeof useList<T>>;

export function useList<T>({
  resource,
  mode = "page",
  limit = 7,
}: {
  resource: string;
  mode?: Mode;
  limit?: number;
}) {
  const search = useSearch("");
  const pagination = usePagination({ initialLimit: limit });
  const filters = useFilters({});
  const selection = useSelection<number>();
  const queryKey = useMemo(
    () =>
      JSON.stringify({
        search: search.debouncedSearch,
        filters: filters.value,
      }),
    [search.debouncedSearch, filters.value]
  );
  const previousQueryKey = useRef(queryKey);
  const queryFn = useCallback(async () => {
    const page = pagination.page;

    const response = await http.list<queryResponse<T>>(
      `/${resource}`,
      {
        search: search.debouncedSearch,
        pagination: {
          page,
          limit: pagination.limit,
        },
        filtering: filters.value,
      }
    );

    return response;
  }, [
    resource,
    pagination.page,
    pagination.limit,
    search.debouncedSearch,
    filters.value,
    queryKey,
  ]);

  const { data, loading, error, refetch } = useQuery<queryResponse<T>>(queryFn);

  const [items, setItems] = useState<T[]>([]);

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


  const meta = useMemo(() => {
    return {
      totalItems: data?.totalItems ?? 0,
      totalPages: data?.totalPages ?? 0,
      hasNext:
        pagination.page < (data?.totalPages ?? 0),
      hasMore:
        pagination.page < (data?.totalPages ?? 0),
    };
  }, [data, pagination.page]);

  return {
    data: items,

    loading,
    error,
    refetch,

    search: search.search,
    setSearch: search.setSearch,
    resetSearch: search.reset,

    filters,
    selection,
    pagination,

    meta,
  };
}
