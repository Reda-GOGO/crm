import {
  Table as TABLE,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  ArrowUpRightIcon,
  FileExclamationPoint,
  ScanSearch,
  FilePlus2
} from "lucide-react";
import { useListContext } from "./ListContext"
import { useTranslation } from "react-i18next";
import type { Column } from "./List";
import { Button } from "@/components/ui/button";
import { Pagination } from "./Pagination";
import { Skeleton } from "@/components/ui/skeleton";
type TableRenderProps<T> = {
  data: T[];
  columns: Column<T>[];
  dir: "ltr" | "rtl";
};

type TableProps<T> = {
  columns: Column<T>[];
  children?: (props: TableRenderProps<T>) => React.ReactNode;
  getRowId: (item: T) => React.Key;
};

export function Table<T>({
  children,
  columns,
  getRowId
}: TableProps<T>) {
  const { data, search, loading, error } = useListContext<T>()
  const { i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  if (children) {
    return children({ data, columns, dir })
  }

  const isSearch = search !== "";
  const isEmpty = data?.length === 0;

  const notFound = isEmpty && isSearch;
  const noContent = isEmpty && !isSearch;

  if (loading) {
    return (
      <Loading
        dir={dir}
        rows={7}
      />
    );
  }
  if (error) {
    return <Error />
  }

  if (notFound) {
    return <NotFound />
  }

  if (noContent) {
    return <NoContent />
  }

  return (

    <div className="w-full select-none">

      <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[496px] ">
        {
          !isEmpty &&
          <Content
            columns={columns}
            getRowId={getRowId}
            data={data}
            dir={dir}
          />
        }
      </div>
      {
        !isEmpty && <Pagination />
      }
    </div>
  )
}

function Content<T>({
  columns,
  getRowId,
  data,
  dir
}: {
  columns: Column<T>[];
  getRowId: (item: T) => React.Key;
  data: T[];
  dir: "ltr" | "rtl";
}) {
  return (
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
          <TableRow key={getRowId(item)}>
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
  )
}


function NoContent() {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[496px] ">
      <Empty className="py-16 h-full">
        <EmptyHeader>
          <EmptyMedia
            className="h-20 w-20 rounded-full bg-muted"
          >
            <FilePlus2 className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle>{t("list.empty.title")}</EmptyTitle>

          <EmptyDescription className="max-w-sm text-center">
            {t("list.empty.description")}
          </EmptyDescription>
        </EmptyHeader>

      </Empty>
    </div>
  );
}


function NotFound<T>() {
  const { resetSearch } = useListContext<T>();
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[496px] ">
      <Empty className="py-16 h-full">
        <EmptyHeader>
          <EmptyMedia className="h-20 w-20 rounded-full bg-muted">
            <ScanSearch className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>{t("list.notFound.title")}</EmptyTitle>
          <EmptyDescription>
            {t("list.notFound.description")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            onClick={resetSearch}
            size="sm"
          >
            <span >
              {t("list.notFound.clear")} <ArrowUpRightIcon />
            </span>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}


export function Loading({
  rows = 6,
  dir = "ltr",
}: { rows?: number, dir?: "ltr" | "rtl" }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[496px] ">
      <TABLE dir={dir} className="w-full rounded-xl ">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-full">
              <Skeleton />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell
              >
                <Skeleton className="h-[47px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TABLE>
    </div>
  );
}


function Error() {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[496px] ">
      <Empty className="py-16 h-full">
        <EmptyHeader>
          <EmptyMedia className="h-20 w-20 rounded-full bg-background border-red-500 border-2  inset-3 ">
            <FileExclamationPoint className="h-10 w-10 text-red-500" />
          </EmptyMedia>

          <EmptyTitle>{t("list.error.title")}</EmptyTitle>

          <EmptyDescription className="max-w-sm text-center">
            {t("list.error.description")}
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex-row justify-center gap-2" >
          <Button>
            {t("list.error.retry")}
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
