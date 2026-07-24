import Col from "@/components/shared/Col";
import { Price } from "@/components/shared/Price";
import { ProductImage } from "@/components/shared/ProductImage";
import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";
import { CheckCircle2, Hash, Plus, Trash } from "lucide-react";

export function Item({
  product,
  isAdded,
  toggle,
}: {
  product: Product;
  isAdded: boolean;
  toggle: () => void;
}) {
  return (
    <Row
      className={cn(
        "group w-full items-center justify-between gap-3 rounded-xl border p-3",
        "bg-background transition-all duration-200",
        "hover:border-primary/30 hover:bg-muted/30 hover:shadow-sm",
        isAdded && "border-2 border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/10"
      )}
    >
      <Row className="min-w-0 gap-3">
        {/* Image */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-sm">
          <ProductImage
            src={product.image!}
            className={cn(
              "h-full w-full object-cover transition-transform duration-300",
              "group-hover:scale-105"
            )}
          />

          {isAdded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
              <div className="rounded-full bg-white p-1 shadow-md dark:bg-black">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <Col className="min-w-0 gap-1">
          <span className="truncate text-sm font-semibold tracking-tight">
            {product.name}
          </span>

          <Row className="items-center gap-1 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span className="truncate text-xs">
              {product.handle}
            </span>
          </Row>

          {/* Price */}
          <Row
            className={cn(
              "mt-1 items-center justify-between gap-4",
              "rounded-lg border bg-muted/40 px-2.5 py-1.5"
            )}
          >
            <Price
              value={formatNumber(product.price)}
              className="font-semibold"
            />

            <Row className="items-center gap-1 text-xs text-muted-foreground">
              <span>per</span>
              <span className="font-medium text-foreground">
                {product.unit}
              </span>
            </Row>
          </Row>
        </Col>
      </Row>

      {/* Action */}
      <Button
        variant={isAdded ? "destructive" : "default"}
        size="icon"
        onClick={toggle}
        className={cn(
          "shrink-0 rounded-full transition-all",
          !isAdded && "opacity-90 group-hover:opacity-100"
        )}
      >
        {isAdded ? (
          <Trash className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </Row>
  );
}
