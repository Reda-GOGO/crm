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
  FolderOpen,
  Hash
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const LOW_STOCK_THRESHOLD = 10;

export function Identity({ product }: { product: Product }) {
  const base = product.units.find((unit) => unit.isBase);
  const status = stockStatus(product.availableQty);

  return (
    <Card className="overflow-hidden ">
      <div className="relative aspect-square w-full overflow-hidden border-b bg-muted/30 rounded-lg">
        <ImageCard image={product.image} />
      </div>
      <CardContent className="space-y-5 pt-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {product.archived && (
              <Badge variant="outline" className="border-zinc-300 text-zinc-500">
                Archived
              </Badge>
            )}
            <Badge variant="outline" className={cn("font-normal", status.className)}>
              {status.label}
            </Badge>
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
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground/50">
            No description provided
          </p>
        )}

        <Separator />

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              Collection
            </dt>
            <dd className="font-medium">
              {product.Collection ? product.Collection.name : "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Boxes className="h-4 w-4" />
              Available
            </dt>
            <dd className="font-mono font-medium tabular-nums">
              {formatNumber(product.availableQty)} {base?.name ?? "units"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Created
            </dt>
            <dd className="font-mono text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}






function stockStatus(qty: number): { label: string; className: string } {
  if (qty <= 0) {
    return {
      label: "Out of stock",
      className:
        "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400",
    };
  }
  if (qty < LOW_STOCK_THRESHOLD) {
    return {
      label: "Low stock",
      className:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
    };
  }
  return {
    label: "In stock",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
  };
}
