import { Badge } from "@/components/ui/badge";
import type { TFunction } from "i18next";

const LOW_STOCK_THRESHOLD = 10;
export function stockStatus(qty: number, t: TFunction, namespace: string) {
  if (qty <= 0) {
    return {
      label: t(namespace + "stock.outOfStock"),
      className:
        "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400",
      render: () => (
        <Badge
          variant="outline"
          className="font-normal border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400"
        >
          {t(namespace + "stock.outOfStock")}
        </Badge>
      ),
    };
  }

  if (qty < LOW_STOCK_THRESHOLD) {
    return {
      label: t(namespace + "stock.lowStock"),
      className:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
      render: () => (
        <Badge
          variant="outline"
          className="font-normal border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400"
        >
          {t(namespace + "stock.lowStock")}
        </Badge>
      ),
    };
  }

  return {
    label: t(namespace + "stock.inStock"),
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
    render: () => (
      <Badge
        variant="outline"
        className="font-normal border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
      >
        {t(namespace + "stock.inStock")}
      </Badge>
    ),
  };
}

