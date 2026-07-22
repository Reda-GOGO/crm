import type { useListReturnType } from "@/hooks/useList";
import { ListContext } from "./ListContext";
import { Table } from "./Table";
import { Search } from "./Search";
import { Pagination } from "./Pagination";
import { Filter } from "./Filter";
import { Toolbar } from "./Toolbar";
import { Grid } from "./Grid";
import type { Identifiable } from "@/types";


export type Column<T> = {
  key: string;
  header: React.ReactNode;
  className?: string;
  cell: (item: T) => React.ReactNode;
};


type ListComponent = <T extends Identifiable>({
  children,
  list,
}: {
  children: React.ReactNode;
  list: useListReturnType<T>;
}) => React.ReactNode;


export const List = Object.assign(
  function List<T extends Identifiable>({
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
  ,
  {
    Toolbar,
    Filter,
    Search,
    Table,
    Pagination,
    Grid,
  }

) as ListComponent & {
  Toolbar: typeof Toolbar;
  Filter: typeof Filter;
  Search: typeof Search;
  Table: typeof Table;
  Pagination: typeof Pagination;
  Grid: typeof Grid;
};


