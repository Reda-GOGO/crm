import type { Product, SaleItemFull } from "@/types"
import { useState } from "react"

export type SaleItemPartial = Partial<SaleItemFull> & {
  totalAmountOverride?: number;
}
export type useSaleLineType = ReturnType<typeof useSaleLineForm>;

export function useSaleLineForm() {

  const [items, setItems] = useState<Map<number, SaleItemPartial>>(new Map());

  const toggle = (product: Product) => {
    setItems(prev => {
      const next = new Map(prev);

      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.set(product.id, createItem(product));
      }

      return next;
    });
  };

  const patch = (productId: number, patch: SaleItemPartial) => {
    setItems(prev => {
      const next = new Map(prev);

      const current = next.get(productId);
      if (!current) return prev;

      next.set(productId, {
        ...current,
        ...patch,
      });

      return next;
    });
  };

  const get = (productId: number) => {
    return items.get(productId);
  }

  const has = (productId: number) => items.has(productId);
  const clear = () => setItems(new Map());

  return {
    items: Array.from(items.values()),
    actions: {
      has,
      get,
      toggle,
      patch,
      clear,
    }
  }
}


function createItem(product: Product): SaleItemPartial {
  const base = product.units?.find((unit) => unit.isBase)

  return {
    productId: product.id,
    product,
    name: product.name,
    unit: product.unit,
    quantity: 1,
    price: product.price!,
    profit: product.price! - product.cost!,
    Unit: base!,
    UnitId: base!.id!,
    totalAmount: product.price! * 1,
    totalAmountOverride: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
