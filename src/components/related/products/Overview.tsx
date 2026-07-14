import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/shared/Price";
import { formatNumber } from "@/lib/utils";
import type { Product, Unit } from "@/types";
import {
  Info,
  Sparkles,
  Tag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Row from "@/components/shared/Row";
import Col from "@/components/shared/Col";
import { Label } from "@/components/ui/label";
import { stockStatus } from "./stockStatus";

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
      <CardContent >
        <Body product={product} />
      </CardContent>
    </Card>
  );
}

function Body({ product }: { product: Product }) {
  return (
    <>
      <Units product={product} />
      <Separator />
      <Stocking product={product} />
    </>
  )
}




function Units({ product }: { product: Product }) {

  const { t } = useTranslation();
  const base = product.units.find((u) => u.isBase);
  const variants = product.units.filter((u) => !u.isBase);



  return (
    <div className="space-y-5 pb-2">

      <DefaultForm
        unit={base!}
      />

      {variants && variants.length > 0 && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{t("products.pricing.variant.title")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("products.pricing.variant.description", { base: base!.name })}
            </p>
          </div>
          <Badge variant="outline" className="font-normal text-muted-foreground">
            {variants.length}
          </Badge>
        </div>
      )}
      {
        variants.map((variant) => {
          return (
            <VariantForm base={base!} unit={variant} key={variant.id} />
          )
        })
      }

    </div>
  );
}


function VariantForm({
  unit,
  base,
}: {
  unit: Partial<Unit>;
  base: Partial<Unit>;
}) {
  const basename = base.name
  const { profit, percent } = calculateMargin(unit.cost!, unit.price!);
  const { t } = useTranslation();
  return (
    <Col>

      <Col className="w-full rounded-lg border p-4">
        <Row className="items-start ">
          <div className="rounded-lg border px-2 py-1.5 w-30">
            1 {unit.name}
          </div>

          <Row className="items-center gap-2">
            <span className="text-muted-foreground">
              {t("products.pricing.variant.contains")}
            </span>
            <div className="rounded-lg border px-2 py-1 5 w-20">
              {unit.defaultValue}
            </div>
            <span className="text-muted-foreground">
              {basename}
            </span>
          </Row>


        </Row>

        <Separator />
        <Row className="items-start justify-between" >
          <Col>
            <Label>{t("products.pricing.default.cost")} </Label>
            <span className="rounded-lg border px-2 py-1 5 ">
              <Price value={formatNumber(unit.cost!.toFixed(2))} />
            </span>
          </Col>
          <Col>
            <Label>{t("products.pricing.default.price")} </Label>
            <span className="rounded-lg border px-2 py-1 5 ">
              <Price value={formatNumber(unit.price!.toFixed(2))} />
            </span>
          </Col>
          <Col>
            <Label>{t("products.pricing.default.profit", { base: basename })} </Label>
            <div className="rounded-lg border px-2 py-1.5">
              <Price value={formatNumber(profit.toFixed(2))} />
            </div>
            <span>

              {percent >= 0 ? "+" : ""}
              {percent.toFixed(2)}
              %
              vs default</span>
          </Col>
        </Row>

      </Col>

    </Col>
  )

}


function DefaultForm({
  unit
}: {
  unit: Partial<Unit>,
}) {
  const { profit, percent } = calculateMargin(unit.cost!, unit.price!);
  const { t } = useTranslation();
  return (
    <Row className="items-start p-4 border rounded-lg justify-start">
      <div className="flex rounded-lg border muted p-4 items-center justify-center">
        <Tag className="h-4 w-4" />
      </div>

      <Col>

        <Col>
          <Label>{t("products.pricing.default.name")}</Label>
          <div className="rounded-lg border px-2 py-1.5">
            {unit.name}
          </div>

        </Col>
        <span className="text-xs text-muted-foreground">
          {t("products.pricing.default.pricedRelative")}
        </span>
        <Badge className="gap-1 font-normal">
          <Sparkles className="h-3 w-3" />
          {t("products.pricing.default.badge")}
        </Badge>
      </Col>

      <Col>
        <Label>{t("products.pricing.default.cost")} </Label>
        <div className="rounded-lg border px-2 py-1.5">
          <Price value={formatNumber(unit.cost!.toFixed(2))} />
        </div>
      </Col>

      <Col>
        <Label>{t("products.pricing.default.price")} </Label>
        <div className="rounded-lg border px-2 py-1.5">
          <Price value={formatNumber(unit.price!.toFixed(2))} />
        </div>
      </Col>

      <Col>
        <Label>{t("products.pricing.variant.profitPer", { base: unit.name })} </Label>
        <div className="rounded-lg border px-2 py-1.5">
          <Price value={formatNumber(profit.toFixed(2))} />
        </div>
        <span className="text-xs text-muted-foreground">
          {t("products.pricing.default.profitDescription")}
        </span>
        <span>
          {percent >= 0 ? "+" : ""}
          {percent.toFixed(2)}
          %
        </span>
      </Col>


    </Row>

  )
}


function Stocking({ product }: { product: Product }) {
  const { t } = useTranslation()
  const status = stockStatus(product.availableQty!, t, "products.single.");
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{t("products.stocking.stock.title")}</span>
          <p className="text-xs text-muted-foreground">{t("products.stocking.stock.trackedIn", { unit: product.unit })}</p>
        </div>
      </div>
      <Row className="items-start justify-between">
        <Col>
          <span className="text-sm font-medium">{t("products.stocking.quantity")}</span>
          <div dir="ltr" className="rounded-lg border px-2 py-1.5 flex gap-9">
            <span>{formatNumber(product.availableQty!)}</span>
            <span>{product.unit}</span>
          </div>
        </Col>

        {status.render()}

      </Row>
      <p className="px-1 text-xs text-muted-foreground">
        {t("products.stocking.stock.quantityDescription", { unit: product.unit })}
      </p>
    </div>
  )
}


function calculateMargin(cost: number, price: number) {
  const profit = price - cost;
  const percent = price === 0 ? 0 : (profit / price) * 100;

  return { profit, percent };
}
