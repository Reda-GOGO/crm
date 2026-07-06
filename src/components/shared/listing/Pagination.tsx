import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { useListContext } from "./ListContext";
import { useTranslation } from "react-i18next";

export function Pagination<T>({
  children,
}: {
  children?: React.ReactNode;
}) {
  const list = useListContext<T>();
  const { t } = useTranslation();
  if (children) {
    return children;
  }
  return (
    <div className="flex w-full text-sm items-center justify-between px-4 py-2">
      <p className="text-muted-foreground @max-[1024px]/main:hidden">
        {t("products.pagination.selected", {
          count: list.selection.count,
          total: list.meta.totalItems,
        })}
      </p>

      <div className="flex items-center justify-between lg:gap-16 @max-[1024px]/main:w-full ">
        <div className="flex gap-8 items-center @max-[1024px]/main:hidden ">
          <p>{t("products.pagination.rowsPerPage")}</p>

          <Select
            defaultValue={list.pagination.limit.toString()}
            onValueChange={(value) => list.pagination.setLimit(Number(value))}
          >
            <SelectTrigger className="px-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="28">28</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex lg:gap-8 items-center @max-[1024px]/main:w-full @max-[1024px]/main:justify-between">
          <p>
            {t("products.pagination.pageInfo", {
              page: list.pagination.page,
              total: list.meta.totalPages,
            })}
          </p>

          <div className="flex gap-2 " dir="ltr">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={list.pagination.page === 1}
              onClick={() => list.pagination.setPage(1)}
            >
              <ChevronsLeft />
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0 "
              disabled={list.pagination.page === 1}
              onClick={list.pagination.previous}
            >
              <ChevronLeft />
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0 "
              disabled={list.pagination.page === list.meta.totalPages}
              onClick={list.pagination.next}
            >
              <ChevronRight />
            </Button>

            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={list.pagination.page === list.meta.totalPages}
              onClick={() => list.pagination.setPage(list.meta.totalPages)}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
