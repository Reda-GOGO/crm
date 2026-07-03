import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export function useSearch<T>({
  value,
}: {
  value: T
}) {
  const [search, setSearch] = useState<T>(value);
  const debouncedSearch = useDebounce(search, 500);
  return {
    search,
    setSearch,
    debouncedSearch,
  }
}

