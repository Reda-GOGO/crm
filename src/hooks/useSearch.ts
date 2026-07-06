import { useState } from "react";
import { useDebounce } from "./useDebounce";

export function useSearch(initialValue = "") {
  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, 500);

  const reset = () => setSearch(initialValue);

  return {
    search,
    setSearch,
    debouncedSearch,
    reset,
  };
}
