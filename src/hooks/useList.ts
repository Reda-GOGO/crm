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
import { useDraftSelection } from "./useDraftSelection";
import type { Identifiable } from "@/types";

type Mode = "page" | "infinite";
export type useListReturnType<T extends Identifiable> = ReturnType<typeof useList<T>>;

/**
 * Central hook for managing CRUD resource listings.
 *
 * Combines data fetching, search, filtering, pagination,
 * row selection, draft selection, and list metadata into a
 * single reusable API.
 *
 * Supports both page-based and infinite scrolling modes.
 *
 * @template T Resource type extending {@link Identifiable}.
 *
 * @param options Configuration options.
 * @param options.resource API resource name (e.g. `"products"` or `"collections"`).
 * @param [options.mode="page"] Pagination strategy. Use `"page"` for traditional pagination or `"infinite"` for infinite scrolling.
 * @param [options.limit=7] Number of items requested per page.
 *
 * @returns An object containing:
 * - `data` - The current list of resources.
 * - `loading` - Whether a request is in progress.
 * - `error` - The last request error, if any.
 * - `refetch` - Reloads the current list.
 * - `search` - Current search query.
 * - `setSearch` - Updates the search query.
 * - `resetSearch` - Clears the current search.
 * - `filters` - Filter state and helpers.
 * - `selection` - Row selection state.
 * - `draftSelection` - Editable selection state for workflows such as collections or orders.
 * - `pagination` - Pagination controls and state.
 * - `meta` - Derived metadata such as total pages and item count.
 *
 * @example
 * ```ts
 * const products = useList<Product>({
 *   resource: "products",
 *   mode: "infinite",
 *   limit: 20,
 * });
 * ``
 */
export function useList<T extends Identifiable>({
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
  const draftSelection = useDraftSelection<T>();
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
    draftSelection,
    pagination,

    meta,
  };
}

