import type { Column } from "@/components/shared/listing/List";
import { Price } from "@/components/shared/Price";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { useListReturnType } from "@/hooks/useList";
import { formatNumber } from "@/lib/utils";
import type { Order } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

export function createColumns({
  list,
  view,
  Action
}: {
  list: useListReturnType<Order>;
  view?: (order: Order) => void;
  Action?: ({ order }: { order: Order }) => React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  return [
    {
      key: "select",
      header: <Checkbox
        onCheckedChange={
          () => list.selection.toggleAll(list.data.map((e) => e.id))
        }
        className={dir === "rtl" ? "mr-3" : ""}
        dir={dir} />,
      className: "w-10 px-3",
      cell: (order) => <Checkbox
        checked={list.selection.isSelected(Number(order.id))}
        onCheckedChange={
          () => list.selection.toggle(Number(order.id))
        }
        className={dir === "rtl" ? "mr-3" : ""} />,
    },
    {
      key: "order number",
      header: t("Collection"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (order: Order) => (
        <div
          onClick={() => view ? view(order) : null}
          className="flex items-center gap-2">
          <span>{order.id}</span>
        </div>
      ),
    },
    {
      key: "total amount",
      header: t("Total Amount"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (order: Order) => (
        <div
          onClick={() => view ? view(order) : null}
          className="flex items-center gap-2">
          <Price value={formatNumber(order.totalAmount.toFixed(2))} />
        </div>
      ),
    },
    {
      key: "action",
      header: t("Actions"),
      className: "w-20 px-4",
      cell: (order: Order) => (
        Action ? <Action order={order} /> :
          (

            <Button variant="ghost" size="sm">
              <EllipsisVertical />
            </Button>
          )
      ),
    },
  ] satisfies Column<Order>[];

}

