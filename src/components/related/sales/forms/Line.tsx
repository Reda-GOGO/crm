import Col from "@/components/shared/Col";
import { Price } from "@/components/shared/Price";
import { ProductImage } from "@/components/shared/ProductImage";
import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { useSaleLineType, SaleItemPartial } from "@/hooks/forms/useSaleItemForm";
import { useBoolean } from "@/hooks/useBoolean";
import { cn, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";
import { Check, CheckCircle2, Hash, Minus, Pencil, Plus, Trash, X } from "lucide-react";

type LineProps = {
  line?: SaleItemPartial;
  product: Product;
  actions: useSaleLineType['actions'];
}

export function Line({ line, product, actions }: LineProps) {
  const isAdded = !!line;
  return (
    <Row
      className={cn(
        "group w-full items-center justify-between gap-3 rounded-xl border p-2",
        "bg-background transition-all duration-200",
        "hover:border-primary/30 hover:bg-muted/30 hover:shadow-sm",
        isAdded && "border-2 border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/10",
      )}
    >
      <Row className="min-w-0 gap-3 max-sm:flex-col">
        <Thumbnail
          image={product.image!}
          active={isAdded}
        />

        <Col className="min-w-0 gap-0.5">
          <Header
            name={product.name}
            handle={product.handle}
            show={!isAdded}
          />

          {isAdded && <Details line={line} actions={actions} product={product} />}
        </Col>
      </Row>

      <Button
        variant={isAdded ? "destructive" : "default"}
        size="icon"
        onClick={() => actions.toggle(product)}
        className="shrink-0 rounded-full"
      >
        {isAdded ? (
          <Trash className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </Row>
  )
}


function Details({
  line,
  actions,
  product,
}: {
  line: SaleItemPartial;
  actions: useSaleLineType['actions'];
  product: Product,
}) {

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="grid w-full grid-cols-7 divide-x max-sm:grid-cols-1 max-sm:divide-x-0">
        <Unit line={line} actions={actions} product={product} />
        <Pricing value={line.price!}
          line={line}
          onChange={
            (price) => actions.patch(line.productId!, {
              price,
              profit: price - line.Unit!.cost,
              totalProfit: (price * line.quantity!) - (line.Unit!.cost * line.quantity!),
              totalAmount: price * line.quantity!,
              totalAmountOverride: undefined
            })
          } />
        <Quantity value={line.quantity!}
          onChange={
            (quantity) => actions.patch(line.productId!, {
              quantity,
              profit: line.price! - line.Unit!.cost,
              totalProfit: (quantity * line.price!) - (line.Unit!.cost * quantity),
              totalAmount: quantity * line.price!,
              totalAmountOverride: undefined
            })

          } />
      </div>

      <Separator />

      <Total
        quantity={line.quantity!}
        unit={line.unit!}
        price={line.price!}
        value={line.totalAmountOverride ?? line.quantity! * line.price!}
        onChange={
          (totalAmountOverride) => actions.patch(line.productId!, {
            profit: line.price! - line.Unit!.cost,
            totalProfit: totalAmountOverride - (line.Unit!.cost * line.quantity!),
            totalAmount: totalAmountOverride,
            totalAmountOverride
          })
        }
      />
    </div>
  )
}

function Total({
  value,
  onChange,
  quantity,
  unit,
  price,
}: {
  value: number;
  onChange: (value: number) => void;
  unit: string;
  price: number;
  quantity: number;
}) {
  const editing = useBoolean();

  return (
    <Row className="items-center justify-between">
      <span className="text-xs text-muted-foreground">
        {quantity} {unit} x {formatNumber(price)} MAD
      </span>

      {editing.value ? (
        <InputEditable
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onConfirm={() => {
            onChange(value);
            editing.off();
          }}
          onCancel={editing.off}
        />
      ) : (
        <Row>
          <Price value={formatNumber(value)} />
          <Button
            variant="outline"
            onClick={editing.toggle}
            size="icon" className="h-7 w-7">
            <Pencil className="h-4 w-4" />
          </Button>
        </Row>
      )}
    </Row>
  )
}

function Pricing({
  value,
  line,
  onChange,
}: {
  value: number;
  line: SaleItemPartial;
  onChange: (price: number) => void;
}) {
  const editing = useBoolean();
  const isChanged = line.Unit!.price !== value;
  return (
    <Col className="gap-1 px-2 col-span-2">
      <Row className="items-center justify-between">
        <Label className="text-xs uppercase text-muted-foreground">
          Price
        </Label>
        <Button
          variant="outline"
          onClick={editing.toggle}
          size="icon" className="h-7 w-7">
          <Pencil className="h-4 w-4" />
        </Button>
      </Row>
      {
        editing.value ? (
          <InputEditable
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onConfirm={editing.off}
            onCancel={editing.off}
          />
        ) : (
          <Col className="gap-0">
            {
              isChanged && (
                <del className="text-[10px]">
                  <Price className="gap-0.5" value={formatNumber(line.Unit!.price)} />
                </del>
              )
            }
            <Price value={formatNumber(value)} />
          </Col>
        )
      }
    </Col>

  )
}

function Unit({
  line,
  actions,
  product
}: {
  line: SaleItemPartial;
  actions: useSaleLineType['actions'];
  product: Product;
}) {
  const editing = useBoolean();

  const units = product.units!;
  const base = product.units!.find((unit) => unit.isBase);
  const defaultValue = line.Unit ?? base;
  const isRenamed = defaultValue!.name !== line.unit

  const onChange = (unit: string) => actions.patch(line.productId!, { unit })
  const onSelect = (unitId: string) => {
    const unit = units.find((unit) => String(unit.id) === unitId)


    const profit = unit!.price - unit!.cost;
    const totalProfit = (unit!.price * line.quantity!) - (unit!.cost * line.quantity!);



    actions.patch(line.productId!, {
      unit: unit!.name,
      Unit: unit,
      UnitId: unit!.id,
      price: unit!.price,
      profit,
      totalProfit,
      totalAmount: unit!.price * line.quantity!,
      totalAmountOverride: undefined
    })
  }



  return (
    <Col className="gap-0 px-2 col-span-3">
      <Row className="items-center justify-between">
        <Label className="text-xs uppercase text-muted-foreground">
          Unit
        </Label>
        <Button
          variant="outline"
          onClick={editing.toggle}
          size="icon" className="h-7 w-7">
          <Pencil className="h-4 w-4" />
        </Button>
      </Row>
      {
        editing.value ? (
          <Row className="items-center">
            <Select
              onValueChange={onSelect}
              defaultValue={String(defaultValue!.id)}>
              <SelectTrigger>
                <SelectValue placeholder="select product unit" />
              </SelectTrigger>

              <SelectContent>
                {
                  units.map((unit) =>
                  (
                    <SelectItem key={unit.id} value={String(unit.id)}> {unit.name}</SelectItem>
                  )
                  )
                }
              </SelectContent>
            </Select>
            <InputEditable
              type="text"
              value={line.unit!}
              onChange={(e) => onChange(e.target.value)}
              onConfirm={editing.off}
              onCancel={editing.off}
            />
          </Row>
        ) : (

          <Row className="items-center gap-2">
            {
              isRenamed && (
                <del className="text-xs">
                  {line!.Unit!.name}
                </del>
              )
            }
            <span className="text-sm text-foreground">
              {line.unit}
            </span>
          </Row>
        )
      }
    </Col>
  )
}

function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <Col className="gap-1 px-2 col-span-2">
      <Label className="text-xs uppercase text-muted-foreground">
        Quantity
      </Label>
      <Row className="gap-1">
        <Button
          variant="outline"
          onClick={() => onChange(value - 1)}
          size="icon" className="h-7 w-7">
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onWheel={(e) => e.currentTarget.blur()}
          className="h-7 text-center text-[13px]"
        />

        <Button
          variant="outline"
          onClick={() => onChange(value + 1)}
          size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
        </Button>
      </Row>
    </Col>
  )
}





function Thumbnail({
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


function Header({
  name,
  handle,
  show,
}: {
  name: string;
  handle: string;
  show: boolean;
}) {
  return (
    <>
      <span className="truncate text-sm font-semibold tracking-tight">
        {name}
      </span>

      {show && (
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




function InputEditable({
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
        onKeyDown={(e) => {
          if (e.key === "Enter") onConfirm();
          if (e.key === "Escape") onCancel();
        }}
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
