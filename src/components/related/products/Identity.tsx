import type { Product } from "@/types";
import { ImageCard } from "./ImageCard";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Boxes,
  Calendar,
  CalendarSync,
  FolderOpen,
  Hash,
  Layers
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const LOW_STOCK_THRESHOLD = 10;

export function Identity({ product }: { product: Product }) {
  const base = product.units.find((unit) => unit.isBase);
  const namespace = "products.single."
  const { t, i18n } = useTranslation()
  const status = stockStatus(product.availableQty, t, namespace);

  return (
    <Card className="overflow-hidden ">
      <div className="p-4">
        <div className="relative aspect-square w-full overflow-hidden border-b bg-muted/30 rounded-lg">
          <ImageCard image={product.image} />
        </div>
      </div>
      <CardContent className="space-y-5 pt-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {product.archived && (
              <Badge variant="outline" className="border-zinc-300 text-zinc-500">
                {t(namespace + "product.archived")}
              </Badge>
            )}
            {status.render()}
          </div>
          <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-foreground">
            {product.name}
          </h1>
          <p className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            {product.handle}
          </p>
        </div>

        {product.description ? (
          <Textarea
            disabled
            value={product.description}
            className="text-sm leading-relaxed text-muted-foreground" />
        ) : (
          <p className="text-sm italic text-muted-foreground/50">
            {t(namespace + "product.noDescription")}
          </p>
        )}

        <div>
          <span className="text-sm uppercase tracking-wider text-muted-foreground ">
            {t(namespace + "product.about")}
          </span>
        </div>
        <Separator />

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              {t(namespace + "product.collection")}
            </dt>
            <dd className="font-medium">
              {product.Collection ? product.Collection.name : "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Boxes className="h-4 w-4" />
              {t(namespace + "product.available")}
            </dt>
            <dd className="font-mono font-medium tabular-nums">
              {formatNumber(product.availableQty)}{" "}
              {base?.name ?? t(namespace + "product.units")}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Layers className="h-4 w-4" />
              {t(namespace + "product.variants")}
            </dt>
            <dd className="font-mono text-muted-foreground">
              {
                <span className="text-xs text-muted-foreground">
                  {t(namespace + "product.variantCount", { count: product.units.length })}
                </span>
              }
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {t(namespace + "product.createdAt")}
            </dt>
            <dd className="font-mono text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString(i18n.language, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </dd>
          </div>


          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <CalendarSync className="h-4 w-4" />
              {t(namespace + "product.lastUpdated")}
            </dt>
            <dd className="font-mono text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString(i18n.language, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}





function stockStatus(qty: number, t: TFunction, namespace: string) {
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

