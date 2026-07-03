import {
  Table as TABLE,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useListContext } from "./ListContext"
import { useTranslation } from "react-i18next";
import type { Column } from "./List";
type TableRenderProps<T> = {
  data: T[];
  columns: Column<T>[];
  dir: "ltr" | "rtl";
};

type TableProps<T> = {
  columns: Column<T>[];
  children?: (props: TableRenderProps<T>) => React.ReactNode;
};

export function Table<T>({
  children,
  columns,
}: TableProps<T>) {
  const { data } = useListContext<T>()
  const { i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  if (children) {
    return children({ data, columns, dir })
  }

  return (

    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[495px] ">
      <TABLE
        dir={dir}
        className="w-full rounded-xl ">
        <TableHeader className="bg-muted">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data && data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={column.className}
                >
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TABLE>
    </div>
  )
}
