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


interface ItemProps {
  product: Product;
  isAdded: boolean;
  toggle: () => void;
}


export function Item({
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

        <Col className="min-w-0 gap-2">
          <ProductHeader
            name={product.name}
            handle={product.handle}
            showHandle={!isAdded}
          />

          {isAdded && <OrderLineDetails />}
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


function OrderLineDetails() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="grid w-full grid-cols-3 divide-x max-sm:grid-cols-1 max-sm:divide-x-0">
        <UnitField />
        <PriceField />
        <QuantityField />
      </div>

      <Separator />

      <TotalField />
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


function TotalField() {
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
            value={299.34}
            onConfirm={editing.off}
            onCancel={editing.off}
          />
        ) : (
          <PriceDisplay value={299.34} />
        )}
      </FieldValue>
    </Row>
  );
}


function UnitField() {
  const editing = useBoolean();

  return (
    <EditableField
      label="Unit"
      editing={editing}
      display="piece"
    >
      <EditableInput
        type="text"
        value="piece"
        onConfirm={editing.off}
        onCancel={editing.off}
      />
    </EditableField>
  );
}


function PriceField() {
  const editing = useBoolean();

  return (
    <EditableField
      label="Price"
      editing={editing}
      display={<Price value={formatNumber(299.34)} />}
    >
      <EditableInput
        type="number"
        value={299.34}
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
    <Field className="gap-1 px-2">
      <FieldLabel className="flex justify-between">
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


function QuantityField() {
  return (
    <Field className="gap-1 px-2">
      <FieldLabel>
        <Label className="text-xs uppercase text-muted-foreground">
          Quantity
        </Label>
      </FieldLabel>

      <Row className="gap-1">
        <Button size="icon" className="h-7 w-7">
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={1}
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
  onCancel,
}: {
  type: "text" | "number";
  value: string | number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Row className="gap-1">
      <Input
        type={type}
        value={value}
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


