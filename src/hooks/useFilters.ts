import { useState } from "react";

export type Filter = {
  key?: string;
  value?: string;
};

export function useFilters(initial: Filter) {
  const [filters, setFilters] = useState(initial);

  const set = (filter: Filter) => {
    setFilters(filter);
  };

  const reset = () => setFilters(initial);

  return {
    value: filters,
    set,
    reset,
  };
}
