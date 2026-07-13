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
  Trash,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Row from "@/components/shared/Row";
import Col from "@/components/shared/Col";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
        <Pricing product={product} />
      </CardContent>
    </Card>
  );
}

function Pricing({ product }: { product: Product }) {
  return (
    <Units product={product} />
  )
}




function Units({ product }: { product: Product }) {

  const { t } = useTranslation();
  const base = product.units.find((u) => u.isBase);
  const variants = product.units.filter((u) => !u.isBase);



  return (
    <div className="space-y-5">

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
        <Row className="items-start justify-between">

          <Col>
            <Input
              value={unit.name}
              placeholder="e.g kg, piece, box" />
            <Row className="items-center gap-2">
              <span className="text-muted-foreground">
                {t("products.pricing.variant.contains")}
              </span>
              <Input
                value={unit.defaultValue}
                type="number"
                placeholder="12"
              />
              <span className="text-muted-foreground">
                {basename}
              </span>
            </Row>
          </Col>


          <Button
            variant="outline" size="sm">
            <Trash />
          </Button>
        </Row>

        <Separator />
        <Row className="items-start justify-between" >
          <Col>
            <Label>{t("products.pricing.default.cost")} </Label>
            <Input
              value={unit.cost}
              onWheel={(e) => e.currentTarget.blur()}
              type="number" placeholder="0,00" />
          </Col>
          <Col>
            <Label>{t("products.pricing.default.price")} </Label>
            <Input
              value={unit.price}
              onWheel={(e) => e.currentTarget.blur()}
              type="number" placeholder="0,00" />
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


function calculateMargin(cost: number, price: number) {
  const profit = price - cost;
  const percent = price === 0 ? 0 : (profit / price) * 100;

  return { profit, percent };
}
