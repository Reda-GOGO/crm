import type { Sale, SaleItem } from "@/types"
import { useState } from "react"

export type SaleItemPartial = Partial<SaleItem>
type SaleType = Sale & {
  sellingItems: SaleItemPartial[]
}

export type useSaleFormReturnType = ReturnType<typeof useSaleForm>
export function useSaleForm() {
  const [sale, setSale] = useState<Partial<SaleType>>({
    id: 0,
    sellingItems: [],
    createdAt: new Date(),
  })
  return {
    sale,
    setSale,
    isSaving: false,
    save: () => { },
  }
}
