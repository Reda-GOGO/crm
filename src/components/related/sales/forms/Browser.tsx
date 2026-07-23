import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronsUpDown, Hash, ListFilter, Loader2, Plus, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import Row from "@/components/shared/Row";
import type { useListReturnType } from "@/hooks/useList";
import type { Product } from "@/types";
import { List } from "@/components/shared/listing/List";
import { forwardRef } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductImage } from "@/components/shared/ProductImage";
import { cn, formatNumber } from "@/lib/utils";
import Col from "@/components/shared/Col";
import { Price } from "@/components/shared/Price";


type useBooleanType = {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export function Browser({
  open,
  list,
}: {
  open: useBooleanType
  list: useListReturnType<Product>
}) {
  return (
    <Dialog open={open.value} onOpenChange={open.toggle}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Browse
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col w-full sm:max-w-4xl h-[90vh] p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>Products</DialogTitle>
          <DialogDescription>Select products to add to the order.</DialogDescription>
        </DialogHeader>

        <Content list={list} />

        <DialogFooter className="mb-0 mx-0">

          <Button onClick={() => open.off()} variant="outline">Cancel</Button>
          <Button onClick={() => open.off()} variant="default">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}


function Content({ list }: { list: useListReturnType<Product> }) {
  const items = list.data;
  const pagination = list.pagination;
  const meta = list.meta;
  const selection = list.draftSelection;

  const observerTarget = useInfiniteScroll({
    loading: list.loading || false,
    hasMore: meta.hasMore || false,
    onLoadMore: pagination.next
  })
  return (
    <div className="flex flex-col flex-1 min-h-0  pb-0 gap-4">
      <List list={list}>
        <List.Toolbar>
          <List.Search resource="products">
            {
              ({ search, setSearch }) => (

                <Row className="w-full items-center px-4">
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products ..."
                  />
                  <Badge className="flex p-2 h-8">
                    <span className="text-sm">collection</span>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </Badge>
                  <Button variant="outline" size="sm">
                    <ListFilter />
                  </Button>
                </Row>
              )
            }
          </List.Search>
        </List.Toolbar>
        <List.Grid className="flex-1  overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden  gap-2 py-2">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-2 px-4">
                {items.map((item) => (
                  <Item key={item.id}
                    isAdded={selection.isSelected(item.id)}
                    toggle={() => selection.toggle(item)}
                    product={item} />
                ))}
                <InfiniteLoader ref={observerTarget} loading={list.loading} hasMore={meta.hasMore} />
              </div>
              <ScrollBar />
            </ScrollArea>
          </div>
        </List.Grid>
      </List>

    </div>
  )
}


function Item({
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


const InfiniteLoader = forwardRef<
  HTMLDivElement,
  {
    loading: boolean;
    hasMore: boolean;
  }
>(
  ({ loading, hasMore }, ref) => {
    return (
      <div ref={ref} className="py-4 flex justify-center w-full">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Loading more products...</span>
          </div>
        ) : hasMore ? (
          <div className="h-4" />
        ) : (
          <span className="text-xs text-muted-foreground opacity-50">
            No more products to show
          </span>
        )}
      </div>
    )
  }
);
