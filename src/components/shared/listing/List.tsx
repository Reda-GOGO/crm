import type { useListReturnType } from "@/hooks/useList";
import { ListContext } from "./ListContext";
import { Table } from "./Table";
import { Search } from "./Search";
import { Pagination } from "./Pagination";
import { Filter } from "./Filter";
import { Toolbar } from "./Toolbar";


export type Column<T> = {
  key: string;
  header: React.ReactNode;
  className?: string;
  cell: (item: T) => React.ReactNode;
};

export function List<T>({
  children,
  list,
}: {
  children: React.ReactNode;
  list: useListReturnType<T>
}) {
  return (
    <ListContext.Provider value={list}>
      {children}
    </ListContext.Provider>
  )
}


List.Toolbar = Toolbar;
List.Filter = Filter;
List.Search = Search;
List.Table = Table;
List.Pagination = Pagination;
