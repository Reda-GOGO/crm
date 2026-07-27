import Col from "@/components/shared/Col";
import Row from "@/components/shared/Row";
import { Price } from "@/components/shared/Price";
import { ProductImage } from "@/components/shared/ProductImage";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useBoolean } from "@/hooks/useBoolean";
import { cn, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";
import {
  Check,
  CheckCircle2,
  Hash,
  Minus,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import type { useSaleFormReturnType } from "@/hooks/forms/useSaleForm";


interface ItemProps {
  form: useSaleFormReturnType;
  product: Product;
  isAdded: boolean;
  toggle: () => void;
}


export function Item({
  form,
  product,
  isAdded,
  toggle,
}: ItemProps) {
  return (
    <Row
      className={cn(
        "group w-full items-center justify-between gap-3 rounded-xl border p-2",
        "bg-background transition-all duration-200",
        "hover:border-primary/30 hover:bg-muted/30 hover:shadow-sm",
        isAdded &&
        "border-2 border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/10"
      )}
    >
      <Row className="min-w-0 gap-3 max-sm:flex-col">
        <ProductThumbnail
          image={product.image!}
          active={isAdded}
        />

        <Col className="min-w-0 gap-0.5">
          <ProductHeader
            name={product.name}
            handle={product.handle}
            showHandle={!isAdded}
          />

          {isAdded && <OrderLineDetails product={product} form={form} />}
        </Col>
      </Row>

      <RemoveButton
        added={isAdded}
        onClick={toggle}
      />
    </Row>
  );
}


function ProductThumbnail({
  image,
  active,
}: {
  image?: string;
  active: boolean;
}) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-sm">
      <ProductImage
        src={image!}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {active && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
          <div className="rounded-full bg-white p-1 shadow-md dark:bg-black">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
        </div>
      )}
    </div>
  );
}


function ProductHeader({
  name,
  handle,
  showHandle,
}: {
  name: string;
  handle: string;
  showHandle: boolean;
}) {
  return (
    <>
      <span className="truncate text-sm font-semibold tracking-tight">
        {name}
      </span>

      {showHandle && (
        <Row className="items-center gap-1 text-muted-foreground">
          <Hash className="h-3.5 w-3.5" />
          <span className="truncate text-xs">
            {handle}
          </span>
        </Row>
      )}
    </>
  );
}


function OrderLineDetails({
  product,
  form,
}: {
  product: Product;
  form: useSaleFormReturnType;
}) {
  const line = form?.sale?.sellingItems?.find(item => item.productId === product.id);
  const unit = {
    value: line?.unit,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => form.patchLine(product.id, { unit: e.target.value }),
  }

  const price = {
    value: line?.price,
    onChange: (e) => form.patchLine(product.id, { price: Number(e.target.value) }),
  }

  const quantity = {
    value: line?.quantity,
    onChange: (e) => form.patchLine(product.id, { quantity: Number(e.target.value) }),
  }

  const totalAmount = {
    value: line?.totalAmount,
    onChange: (e) => form.patchLine(product.id, { totalAmount: Number(e.target.value) }),
  }
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="grid w-full grid-cols-3 divide-x max-sm:grid-cols-1 max-sm:divide-x-0">
        <UnitField value={unit.value!} onChange={unit.onChange} />
        <PriceField value={price.value!} onChange={price.onChange} />
        <QuantityField value={quantity.value!} onChange={quantity.onChange} />
      </div>

      <Separator />

      <TotalField value={totalAmount.value!} onChange={totalAmount.onChange} />
    </div>
  );
}


function RemoveButton({
  added,
  onClick,
}: {
  added: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={added ? "destructive" : "default"}
      size="icon"
      onClick={onClick}
      className="shrink-0 rounded-full"
    >
      {added ? (
        <Trash className="h-4 w-4" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
    </Button>
  );
}


function TotalField({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const editing = useBoolean();

  return (
    <Row className="items-center justify-between">
      <span className="text-xs uppercase text-muted-foreground">
        1 piece x 299.34 MAD
      </span>

      <FieldValue
        label="Total"
        editing={editing.value}
        onEdit={editing.toggle}
      >
        {editing.value ? (
          <EditableInput
            type="number"
            value={value}
            onChange={onChange}
            onConfirm={editing.off}
            onCancel={editing.off}
          />
        ) : (
          <PriceDisplay value={value} />
        )}
      </FieldValue>
    </Row>
  );
}


function UnitField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const editing = useBoolean();

  return (
    <EditableField
      label="Unit"
      editing={editing}
      display={value}
    >
      <EditableInput
        type="text"
        value={value}
        onChange={onChange}
        onConfirm={editing.off}
        onCancel={editing.off}
      />
    </EditableField>
  );
}


function PriceField({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const editing = useBoolean();

  return (
    <EditableField
      label="Price"
      editing={editing}
      display={<Price value={formatNumber(value)} />}
    >
      <EditableInput
        type="number"
        value={value}
        onChange={onChange}
        onConfirm={editing.off}
        onCancel={editing.off}
      />
    </EditableField>
  );
}


function EditableField({
  label,
  display,
  editing,
  children,
}: {
  label: string;
  display: React.ReactNode;
  editing: ReturnType<typeof useBoolean>;
  children: React.ReactNode;
}) {
  return (
    <Field className="gap-0 px-2">
      <FieldLabel className="flex justify-between items-center ">
        <Label className="text-xs uppercase text-muted-foreground">
          {label}
        </Label>

        <EditButton hidden={editing.value} onClick={editing.toggle} />
      </FieldLabel>

      {editing.value ? children : (
        <span className="text-sm text-foreground">
          {display}
        </span>
      )}
    </Field>
  );
}


function QuantityField({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Field className="gap-1 px-2">
      <FieldLabel>
        <Label className="text-xs uppercase text-muted-foreground">
          Quantity
        </Label>
      </FieldLabel>

      <Row className="gap-1">
        <Button
          size="icon" className="h-7 w-7">
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={value}
          onChange={onChange}
          onWheel={(e) => e.currentTarget.blur()}
          className="h-7 text-center text-[13px]"
        />

        <Button size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
        </Button>
      </Row>
    </Field>
  );
}


function FieldValue({
  label,
  editing,
  onEdit,
  children,
}: {
  label: string;
  editing: boolean;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <Row className="items-center gap-2">
      <span className="text-xs">
        {label}
      </span>

      {children}

      {!editing && (
        <EditButton onClick={onEdit} />
      )}
    </Row>
  );
}


function PriceDisplay({
  value,
}: {
  value: number;
}) {
  return (
    <Price
      className="rounded-lg border px-2 py-1.5"
      value={formatNumber(value)}
    />
  );
}


function EditButton({
  hidden,
  onClick,
}: {
  hidden?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={cn(
        "h-7 w-7",
        hidden && "invisible"
      )}
    >
      <Pencil className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}


function EditableInput({
  type,
  value,
  onConfirm,
  onChange,
  onCancel,
}: {
  type: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Row className="gap-1">
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder="0.00"
        onWheel={(e) => e.currentTarget.blur()}
        className="h-7 text-center text-[13px]"
      />

      <Button
        size="icon"
        variant="outline"
        onClick={onConfirm}
        className="h-7 w-7 text-emerald-600"
      >
        <Check className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onCancel}
        className="h-7 w-7 text-red-600"
      >
        <X className="h-4 w-4" />
      </Button>
    </Row>
  );
}


