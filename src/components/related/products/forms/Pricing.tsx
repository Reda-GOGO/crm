import {
  FilePlus2,
  Plus,
  Sparkles,
  Tag,
  Trash,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import type { Unit } from "@/types";
import Col from "@/components/shared/Col";
import { Button } from "@/components/ui/button";
import Row from "@/components/shared/Row";
import { Label } from "@/components/ui/label";
import { Price } from "@/components/shared/Price";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useTranslation } from "react-i18next";
import type { useProductFormReturnType } from "@/hooks/forms/useProductForm";

function calculateMargin(cost: number, price: number) {
  const profit = price - cost;
  const percent = price === 0 ? 0 : (profit / price) * 100;

  return { profit, percent };
}

export function Pricing({ form }: { form: useProductFormReturnType }) {
  const { t } = useTranslation();
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("products.pricing.title")}
          </CardTitle>
        </div>
        <CardDescription>
          {t("products.pricing.description")}
        </CardDescription>
        {form.errors.units && form.errors.units[-1] && (
          <div className="span text-sm font-normal text-red-500">
            {form.errors.units[-1].name}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Units form={form} />
      </CardContent>
    </Card>
  );
}


function Units({ form }: { form: useProductFormReturnType }) {

  const { t } = useTranslation();
  const {
    base,
    variants,
    addBase,
    updateBase,
    addVariant,
  } = form.unit;

  if (!base) return <NoBase addBase={addBase} />

  return (
    <div className="space-y-5">

      <DefaultForm
        form={form}
        unit={base}
        onChange={(patch) => updateBase(base.id, patch)} />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{t("products.pricing.variant.title")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("products.pricing.variant.description", { base: base.name })}
          </p>
        </div>
        <Badge variant="outline" className="font-normal text-muted-foreground">
          {variants.length}
        </Badge>
      </div>
      {
        variants.map((variant) => {
          return (
            <VariantForm form={form} unit={variant} key={variant.id} />
          )
        })
      }

      <Button
        className="w-full"
        onClick={addVariant}
      >
        <Plus className="h-3.5 w-3.5" />
        {t("products.pricing.buttons.addPackSize")}
      </Button>
    </div>
  );
}


function VariantForm({
  unit,
  form,
}: {
  unit: Partial<Unit>;
  form: useProductFormReturnType;
}) {
  const basename = form.unit.base!.name
  const { profit, percent } = calculateMargin(unit.cost!, unit.price!);
  const { removeVariant, updateVariant } = form.unit;
  const onRemove = () => removeVariant(unit.id!);
  const onChange = (patch: Partial<Unit>) => updateVariant(unit.id!, patch);
  const { t } = useTranslation();
  return (
    <Col>

      <Col className="w-full rounded-lg border p-4">
        <Row className="items-start justify-between">

          <Col>
            <Input
              value={unit.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g kg, piece, box" />
            {
              form.errors.units && form.errors.units[unit.id!] && (
                <div className="span text-sm font-normal text-red-500">
                  {form.errors.units[unit.id!].name}
                </div>
              )
            }
            <Row className="items-center gap-2">
              <span className="text-muted-foreground">
                {t("products.pricing.variant.contains")}
              </span>
              <Input
                value={unit.defaultValue}
                onChange={
                  (e) => onChange({
                    quantityInBase: parseFloat(e.target.value) ?? 0,
                    defaultValue: parseFloat(e.target.value) ?? 0,
                  })
                }
                type="number"
                placeholder="12"
              />
              <span className="text-muted-foreground">
                {basename}
              </span>
            </Row>
          </Col>


          <Button
            onClick={onRemove}
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
              onChange={(e) => onChange({ cost: parseFloat(e.target.value) ?? 0 })}
              type="number" placeholder="0,00" />
          </Col>
          <Col>
            <Label>{t("products.pricing.default.price")} </Label>
            <Input
              value={unit.price}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => onChange({ price: parseFloat(e.target.value) ?? 0 })}
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
  form,
  unit,
  onChange
}: {
  form: useProductFormReturnType;
  unit: Partial<Unit>,
  onChange: (patch: Partial<Unit>) => void
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
          <Input
            value={unit.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-60"
            placeholder="e.g kg, piece, box" />
          {
            form.errors.units && form.errors.units[unit.id!] && (
              <div className="span text-sm font-normal text-red-500">
                {form.errors.units[unit.id!].name}
              </div>
            )
          }

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
        <Input
          value={unit.cost}
          onWheel={(e) => e.currentTarget.blur()}
          onChange={(e) => onChange({ cost: parseFloat(e.target.value) ?? 0 })}
          type="number" placeholder="0,00" />
      </Col>

      <Col>
        <Label>{t("products.pricing.default.price")} </Label>
        <Input
          value={unit.price}
          onWheel={(e) => e.currentTarget.blur()}
          onChange={(e) => onChange({ price: parseFloat(e.target.value) ?? 0 })}
          type="number" placeholder="0,00" />
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



function NoBase({
  addBase,
}: {
  addBase: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm h-[470px] ">
      <Empty className="py-16 h-full">
        <EmptyHeader>
          <EmptyMedia
            className="h-20 w-20 rounded-full bg-muted"
          >
            <FilePlus2 className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle className="uppercase">{t("products.pricing.empty.title")} </EmptyTitle>

          <EmptyDescription className="max-w-sm text-center">
            {t("products.pricing.empty.description")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button
            size="sm"
            onClick={addBase}
          >
            <Plus className="h-3.5 w-3.5" />
            {t("products.pricing.buttons.addUnit")}
          </Button>
        </EmptyContent>

      </Empty>
    </div>
  )
}
