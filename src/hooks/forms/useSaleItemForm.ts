import type { SaleItem } from "@/types"
import { useState } from "react"

export function useSaleItemsForm() {
  const [items, setItems] = useState<Partial<SaleItem[]>>([])
  return {
    items,
    setItems,
    isSaving: false,
    save: () => { },
  }
}
