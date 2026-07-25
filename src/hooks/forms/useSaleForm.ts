import { useState } from "react"

type Sale = {
  id: number
  createdAt: Date
}
export function useSaleForm() {
  const [sale, setSale] = useState<Sale>({
    id: 0,
    createdAt: new Date(),
  })
  return {
    sale, setSale,
    isSaving: false,
    save: () => { },
  }
}
