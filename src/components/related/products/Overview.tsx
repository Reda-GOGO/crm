import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/shared/Price";
import { cn, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";
import {
  DollarSign,
  Info,
  Layers,
  Sparkles,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Overview({ product }: { product: Product }) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("products.single.overview.title")}
          </CardTitle>
        </div>
        <CardDescription>{t("products.single.overview.description", { product: product.name })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <Pricing product={product} />
        <Separator />
        <Units product={product} />
        <Separator />
      </CardContent>
    </Card>
  );
}

function Heading({
  icon: Icon,
  title,
  caption,
}: {
  icon: React.ElementType;
  title: string;
  caption: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-sm font-medium leading-none">{title}</span>
        <span className="mt-1 text-xs text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

// product.price / product.cost describe the default (base) unit — everything
// else in this card is expressed relative to that anchor.
function Pricing({ product }: { product: Product }) {
  const base = product.units.find((unit) => unit.isBase);
  const margin = product.price - product.cost;
  const marginPct = product.price !== 0 ? (margin / product.price) * 100 : 0;
  const positive = margin >= 0;
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Heading
        icon={DollarSign}
        title={t("products.single.overview.basePricing")}
        caption={t("products.single.overview.basePricingCaption", { unit: base?.name ?? "unit" })}
      />
      <div className="flex flex-col gap-4 rounded-lg border bg-muted/10 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {t("products.single.overview.pricePer", { unit: base?.name ?? "unit" })}
          </span>
          <div className="font-serif text-4xl font-medium leading-none tracking-tight tabular-nums">
            <Price value={formatNumber(product.price)} />
          </div>
        </div>
        <div className="flex gap-6 sm:gap-8">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              {t("products.single.overview.cost")}
            </span>
            <span className="font-mono text-lg font-semibold tabular-nums">
              <Price value={formatNumber(product.cost)} />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{t("products.single.overview.margin")}</span>
            <span
              className={cn(
                "flex items-center gap-1 font-mono text-lg font-semibold tabular-nums",
                positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              )}
            >
              {positive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {marginPct.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Units({ product }: { product: Product }) {
  const base = product.units.find((unit) => unit.isBase);
  const baseUnitPrice = base?.quantityInBase ? base.price / base.quantityInBase : product.price;

  const rows = product.units.map((unit) => {
    const effective = unit.quantityInBase > 0 ? unit.price / unit.quantityInBase : unit.price;
    const deltaPct = baseUnitPrice !== 0 ? ((effective - baseUnitPrice) / baseUnitPrice) * 100 : 0;
    return { ...unit, effective, deltaPct };
  });

  const bestValue = rows.length > 1 ? rows.reduce((min, r) => (r.effective < min.effective ? r : min)) : null;
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Heading
        icon={Layers}
        title={t("products.single.overview.variants")}
        caption={t("products.single.overview.variantsCaption", { unit: base?.name ?? "unit" })}
      />
      <div className="divide-y divide-border rounded-lg border">
        {rows.map((unit) => {
          const isBestValue = bestValue?.id === unit.id && bestValue.effective < baseUnitPrice;
          return (
            <div key={unit.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Tag className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{unit.name}</span>
                    {isBestValue && (
                      <Badge className="gap-1 border-emerald-200 bg-emerald-50 font-normal text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        Best value
                      </Badge>
                    )}
                  </div>
                  {unit.isBase ? (
                    <span className="text-xs text-muted-foreground">{t("products.single.overview.baseUnit")}</span>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">
                      × {formatNumber(unit.quantityInBase)} {base?.name ?? ""}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{t("products.single.overview.price")}</span>
                  <span className="font-mono text-sm tabular-nums">
                    <Price value={formatNumber(unit.price)} />
                  </span>
                </div>
                <div className="flex min-w-[92px] flex-col items-end">
                  <span className="text-xs text-muted-foreground">
                    {t("products.single.overview.perUnit", { unit: base?.name ?? "unit" })}
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums">
                    <Price value={formatNumber(unit.effective)} />
                  </span>
                  {!unit.isBase && (
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        unit.deltaPct <= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {unit.deltaPct > 0 ? "+" : ""}
                      {unit.deltaPct.toFixed(0)}% vs base
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


