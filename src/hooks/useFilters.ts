import { useState } from "react";

export function useFilters<T extends Record<string, any>>(initial: T) {
  const [filters, setFilters] = useState<T>(initial);

  const setFilter = <K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const reset = () => setFilters(initial);

  return {
    filters,
    setFilter,
    setFilters,
    reset,
  };
}
