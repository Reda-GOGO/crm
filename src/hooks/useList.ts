import { useCallback } from "react";

import { http } from "@/infrastructure/http";
import { useFilters } from "./useFilters";
import { usePagination } from "./usePagination";
import { useQuery, type queryResponse } from "./useQuery";
import { useSearch } from "./useSearch";
import { useSelection } from "./useSelection";
import { useListMeta } from "./useList/useListMeta";
import { createListQueryKey } from "./useList/createListQueryKey";
import { useListItems } from "./useList/useListItems";

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
  const queryKey = createListQueryKey({
    search: search.debouncedSearch,
    filters: filters.value,
  });
  const queryFn = useCallback(async () => {
    return await http.list<queryResponse<T>>(
      `/${resource}`,
      {
        search: search.debouncedSearch,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
        filtering: filters.value,
      }
    );
  }, [pagination.page, pagination.limit, search.debouncedSearch, filters.value, queryKey]);

  const { data, loading, error, refetch } = useQuery<queryResponse<T>>(queryFn);
  const items = useListItems<T>({ data, mode, queryKey, pagination });


  const meta = useListMeta({
    totalPages: data?.totalPages ?? 0,
    totalItems: data?.totalItems ?? 0,
    page: pagination.page,
  });

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

