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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      {product.units.length > 0 && <Units product={product} />}
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
        variants.length > 0 ? (
          <div className="rounded-lg border">
            <Table className="w-full ">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Cost")}</TableHead>
                  <TableHead>{t("Price")}</TableHead>
                  <TableHead> {t("Profit")}</TableHead>
                  <TableHead> Value Per <b>{base!.name}</b> </TableHead>
                </TableRow>

              </TableHeader>
              <TableBody className="max-h-90">

                {
                  variants.map((variant) => {
                    return (
                      <VariantLine base={base!} unit={variant} key={variant.id} />
                    )
                  })
                }
              </TableBody>

            </Table>
          </div>
        ) : <VariantEmpty />
      }

    </div>
  );
}

function VariantEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-dashed border-2 text-center p-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Info className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm uppercase font-semibold ">No variants in this product yet</p>
        <p className="text-sm text-muted-foreground">
          Add variants to see them listed here.
        </p>
      </div>
    </div>
  )
}
function VariantLine({
  unit,
  base,
}: {
  unit: Partial<Unit>;
  base: Partial<Unit>;
}) {
  const basename = base.name
  const { profit, percent } = calculateMargin(unit.cost!, unit.price!);
  return (
    <TableRow>
      <TableCell>
        {unit.name}
      </TableCell>
      <TableCell>
        <Price value={formatNumber(unit.cost!)} />
      </TableCell>
      <TableCell>
        <Price value={formatNumber(unit!.price!)} />
      </TableCell>
      <TableCell>
        <div>
          <Price value={formatNumber(profit)} />
          <span>{percent.toFixed(2)} %</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          {unit.quantityInBase}
          <b>{basename}</b>
        </div>
      </TableCell>

    </TableRow>
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
