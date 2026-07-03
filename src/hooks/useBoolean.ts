import { useState } from "react"

export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: () => setValue(!value),
  }
}
