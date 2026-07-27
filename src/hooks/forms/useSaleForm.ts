import { useState } from "react";
import type { Product, Sale, SaleItemFull } from "@/types";

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

  const isSelected = (productId: number) =>
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

  return {
    sale,
    setSale,
    isSelected,
    toggleLine,
    patchLine,
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
