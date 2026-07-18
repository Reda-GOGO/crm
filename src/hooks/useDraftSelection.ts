import { useState, useCallback } from "react";

type DraftItem<T> = T & {
  quantity: number;
  unitPrice: number;
  unitName?: string;
};

export function useDraftSelection<T extends { id: number }>() {
  const [items, setItems] = useState<Map<number, DraftItem<T>>>(new Map());

  const toggle = useCallback((item: T) => {
    setItems(prev => {
      const next = new Map(prev);

      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.set(item.id, {
          ...item,
          quantity: 1,
          unitPrice: (item as any).price,
        });
      }

      return next;
    });
  }, []);

  const updateField = useCallback(
    (id: number, patch: Partial<DraftItem<T>>) => {
      setItems(prev => {
        const next = new Map(prev);

        const current = next.get(id);
        if (!current) return prev;

        next.set(id, {
          ...current,
          ...patch,
        });

        return next;
      });
    },
    []
  );

  const remove = useCallback((id: number) => {
    setItems(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const replace = useCallback((items: T[]) => {
    const map = new Map<number, DraftItem<T>>();

    for (const item of items) {
      map.set(item.id, {
        ...item,
        quantity: 1,
        unitPrice: (item as any).price,
      });
    }

    setItems(map);
  }, []);

  const clear = useCallback(() => {
    setItems(new Map());
  }, []);

  return {
    items, // Map

    selectedArray: Array.from(items.values()),

    toggle,
    replace,
    updateField,
    remove,
    clear,

    isSelected: (id: number) => items.has(id),

    count: items.size,
  };
}
