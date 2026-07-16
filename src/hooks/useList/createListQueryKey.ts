export function createListQueryKey(value: {
  search: string;
  filters: unknown;
}) {
  return JSON.stringify({
    search: value.search,
    filters: value.filters,
  });
}
