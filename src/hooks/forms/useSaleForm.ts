import { useState } from "react";
import type { Product, Sale, SaleItemFull } from "@/types";
import { useSaleLineForm } from "./useSaleItemForm";

export type SaleItemPartial = Partial<SaleItemFull>;

type SaleForm = Sale & {
  sellingItems: SaleItemPartial[];
};

const initialSale: Partial<SaleForm> = {
  id: 0,
  createdAt: new Date(),
  sellingItems: [],
};

export type useSaleFormReturnType = ReturnType<typeof useSaleForm>;

export function useSaleForm() {
  const [sale, setSale] = useState(initialSale);
  const lines = useSaleLineForm();

  const isSelected = (productId: number) =>
    sale.sellingItems?.some(item => item.productId === productId) ?? false;

  const hasLine = (productId: number) =>
    sale.sellingItems?.some(item => item.productId === productId) ?? false;


  const toggleLine = (product: Product) => {
    setSale(prev => {
      const items = prev.sellingItems ?? [];
      const exists = items.some(item => item.productId === product.id);

      return {
        ...prev,
        sellingItems: exists
          ? items.filter(item => item.productId !== product.id)
          : [...items, createSaleItem(product)],
      };
    });
  };

  const getLine = (productId: number) => {
    return sale.sellingItems?.find(item => item.productId === productId);
  }

  const patchLine = (productId: number, saleItem: SaleItemPartial) => {
    setSale(prev => {
      const items = prev.sellingItems ?? [];
      return {
        ...prev,
        sellingItems: items.map(item => {
          if (item.productId === productId) {
            return {
              ...item,
              ...saleItem,
            };
          }
          return item;
        }),
      }

    });
  };

  const actions = {
    has: hasLine,
    toggle: toggleLine,
    patch: patchLine,
    get: getLine,
  }

  return {
    sale,
    setSale,
    isSelected,
    toggleLine,
    patchLine,
    actions,
    lines: sale.sellingItems,
    actuallines: lines
  };
}

function createSaleItem(product: Product): SaleItemPartial {
  return {
    productId: product.id,
    product,
    name: product.name,
    unit: product.unit,
    quantity: 1,
    price: product.price,
    profit: product.price - product.cost,
    totalAmount: product.price * 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
