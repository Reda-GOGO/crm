import { Building2, Hash, LayersPlus, Mail, Phone } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { stockStatus } from "../stockStatus";
import { useTranslation } from "react-i18next";
import type { useProductFormReturnType } from "@/hooks/forms/useProductForm";

/**
 * `Product` doesn't carry provider fields yet — add this to your type:
 *
 *   provider: { name: string; email: string; phone: string; ice: string } | null
 *
 * The form below reads/writes `product.provider` and falls back to empty
 * strings when it's null, so it works whether or not it's set yet.
 */
type ProviderInfo = {
  name: string;
  email: string;
  phone: string;
  ice: string;
};

const EMPTY_PROVIDER: ProviderInfo = { name: "", email: "", phone: "", ice: "" };


export function Stocking({ form }: { form: useProductFormReturnType }) {
  const { product, setProduct } = form;
  const base = product.units.find((u) => u.isBase);
  const provider = { ...EMPTY_PROVIDER, ...(product as { provider?: ProviderInfo }).provider };
  const { t } = useTranslation()

  function setQuantity(qty: number) {
    setProduct((prev) => ({ ...prev, availableQty: Math.max(0, qty) }));
  }

  function adjustQuantity(delta: number) {
    setQuantity(product.availableQty! + delta);
  }

  function updateProvider(patch: Partial<ProviderInfo>) {
    setProduct((prev) => ({
      ...prev,
      provider: { ...EMPTY_PROVIDER, ...(prev as { provider?: ProviderInfo }).provider, ...patch },
    }));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LayersPlus className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("products.stocking.title")}
          </CardTitle>
        </div>
        <CardDescription>
          {t("products.stocking.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StockSection
          quantity={product.availableQty!}
          unitName={base?.name ?? null}
          onSetQuantity={setQuantity}
          onAdjust={adjustQuantity}
        />
        <Separator />
        <ProviderSection provider={provider} onChange={updateProvider} />
      </CardContent>
    </Card>
  );
}



function StockSection({
  quantity,
  unitName,
  onSetQuantity,
  onAdjust,
}: {
  quantity: number;
  unitName: string | null;
  onSetQuantity: (qty: number) => void;
  onAdjust: (delta: number) => void;
}) {
  const { t } = useTranslation()
  if (!unitName) {
    return (
      <div className="rounded-xl border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
        {t("products.stocking.stock.missingUnit")}
      </div>
    );
  }

  const status = stockStatus(quantity, t, "products.single.");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{t("products.stocking.stock.title")}</span>
          <p className="text-xs text-muted-foreground">{t("products.stocking.stock.trackedIn", { unit: unitName })}</p>
        </div>
        {status.render()}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border bg-muted/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <Input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => onSetQuantity(parseFloat(e.target.value) || 0)}
          />
          <span className="text-sm text-muted-foreground">
            {unitName}
            {quantity === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <AdjustButton label="−10" onClick={() => onAdjust(-10)} />
          <AdjustButton label="−1" onClick={() => onAdjust(-1)} />
          <AdjustButton label="+1" onClick={() => onAdjust(1)} />
          <AdjustButton label="+10" onClick={() => onAdjust(10)} />
        </div>
      </div>
      <p className="px-1 text-xs text-muted-foreground">
        {t("products.stocking.stock.quantityDescription", { unit: unitName })}
      </p>
    </div>
  );
}

function AdjustButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} className="h-8 px-2.5 font-mono text-xs">
      {label}
    </Button>
  );
}


function ProviderSection({
  provider,
  onChange,
}: {
  provider: ProviderInfo;
  onChange: (patch: Partial<ProviderInfo>) => void;
}) {
  const { t } = useTranslation()
  return (
    <div className="space-y-3">
      <div>
        <span className="text-sm font-medium">{t("products.stocking.provider.title")}</span>
        <p className="text-xs text-muted-foreground">{t("products.stocking.provider.description")}</p>
      </div>

      <div className="space-y-4">
        <ProviderField
          icon={Building2}
          label={t("products.stocking.provider.company")}
          value={provider.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Acme Inc."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProviderField
            icon={Mail}
            label={t("products.stocking.provider.email")}
            type="email"
            value={provider.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="contact@acme.com"
          />
          <ProviderField
            icon={Phone}
            label={t("products.stocking.provider.phone")}
            type="tel"
            value={provider.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+212 6 00 00 00 00"
          />
        </div>
        <ProviderField
          icon={Hash}
          label={t("products.stocking.provider.ice")}
          value={provider.ice}
          onChange={(e) => onChange({ ice: e.target.value })}
          placeholder="000000000000000"
          mono
        />
      </div>
    </div>
  );
}

function ProviderField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  mono?: boolean;
}) {
  const id = `provider-${label.toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn("pl-9", mono && "font-mono")}
        />
      </div>
    </div>
  );
}
