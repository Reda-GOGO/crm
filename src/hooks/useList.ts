import { useCallback, useEffect, useMemo, useState } from "react";

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
}: {
  resource: string;
  mode?: Mode;
}) {
  const search = useSearch("");
  const pagination = usePagination({ initialLimit: 7 });
  const filters = useFilters({});
  const selection = useSelection<number>();

  const queryFn = useCallback(() => {
    return http.list<queryResponse<T>>(`/${resource}`, {
      search: search.debouncedSearch,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
      },
      filtering: {
        ...filters.value,
      },
    });
  }, [
    resource,
    search.debouncedSearch,
    pagination.page,
    pagination.limit,
    filters.value,
  ]);

  const { data, loading, error, refetch } = useQuery<queryResponse<T>>(queryFn);

  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (!data) return;

    if (mode === "page") {
      setItems(data.items);
      return;
    }

    // infinite mode
    if (pagination.page === 1) {
      setItems(data.items);
      return;
    }

    setItems(prev => [...prev, ...data.items]);
  }, [data, mode, pagination.page]);

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
