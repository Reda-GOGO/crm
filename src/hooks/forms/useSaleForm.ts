import { useState } from "react";
import type { Sale, SaleItemFull } from "@/types";
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

  return {
    sale,
    setSale,
    lines,
  };
}

