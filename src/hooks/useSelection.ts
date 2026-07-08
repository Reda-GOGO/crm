import { useCallback, useState } from "react";

export function useSelection<T extends string | number>() {
  const [selected, setSelected] = useState<Set<T>>(new Set());

  const toggle = useCallback((id: T) => {
    setSelected(prev => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  }, []);

  const toggleAll = useCallback((items: T[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.size !== items.length) return new Set(items);
      else return new Set();
    });
  }, [selected]);

  const clear = useCallback(() => {
    setSelected(new Set());
  }, []);

  const isSelected = useCallback(
    (id: T) => selected.has(id),
    [selected]
  );

  return {
    selected,
    toggle,
    toggleAll,
    clear,
    isSelected,
    count: selected.size,
    hasSelection: selected.size > 0,
  };
}
