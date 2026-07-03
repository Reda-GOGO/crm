import type { useListReturnType } from "@/hooks/useList";
import { createContext, useContext } from "react";

type ListContextType<T> = useListReturnType<T>;

export const ListContext = createContext<ListContextType<any> | null>(null);

export function useListContext<T>() {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("useListContext must be used inside <List>");
  }

  return context as ListContextType<T>;
}

