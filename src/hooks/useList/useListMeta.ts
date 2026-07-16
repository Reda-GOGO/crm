export function useListMeta({
  totalPages,
  totalItems,
  page,
}: {
  totalPages?: number;
  totalItems?: number;
  page: number;
}) {
  const pages = totalPages ?? 0;

  return {
    totalItems: totalItems ?? 0,
    totalPages: pages,
    hasMore: page < pages,
  };
}
