import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Hash, Loader2, Package, PackageX, Plus, Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useList, type useListReturnType } from "@/hooks/useList";
import type { Product } from "@/types";
import { List } from "@/components/shared/listing/List";
import { ProductImage } from "@/components/shared/ProductImage";
import Row from "@/components/shared/Row";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { forwardRef, useEffect, useRef } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Col from "@/components/shared/Col";
import { Price } from "@/components/shared/Price";
import { cn, formatNumber } from "@/lib/utils";
import type { useCollectionFormReturnType } from "@/hooks/forms/useCollectionForm";

export function Items({ form }: { form: useCollectionFormReturnType }) {
  const hook = useList<Product>({
    resource: "products",
    mode: "infinite",
    limit: 10,
  })
  const initialized = useRef(false);
  console.log("collection products : ", form.collection.products);
  console.log("hook.draftSelection items : ", hook.draftSelection.items);

  useEffect(() => {
    if (initialized.current) return;
    if (!form.collection.products?.length) return;

    hook.draftSelection.replace(form.collection.products ?? []);
    initialized.current = true;
  }, [form.collection.products]);

  const toggle = (item: Product) => {
    const selected = hook.draftSelection.isSelected(item.id!);

    hook.draftSelection.toggle(item);

    form.setCollection(prev => ({
      ...prev,
      products: selected
        ? prev.products!.filter(p => p.id !== item.id)
        : [...prev.products!, item],
    }));
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Package className="h-3.5 w-3.5 text-primary" />
          Collection Product(s)
        </CardTitle>
        <CardDescription>
          Basic information about the collection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 h-full">
        <div className="w-full h-full flex flex-col">
          <Browse hook={hook} toggle={toggle} />
          <ItemContent hook={hook} form={form} toggle={toggle} />
        </div>
      </CardContent>
    </Card>
  )
}

export function ItemContent({
  hook,
  form,
  toggle
}: {
  hook: useListReturnType<Product>
  form: useCollectionFormReturnType
  toggle: (item: Product) => void
}) {
  const selection = hook.draftSelection;
  const items = form.collection.products!;
  if (items.length === 0) return <NoContent />
  return (
    <div className="flex-1 min-h-0 gap-4 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-hidden  gap-2 py-2">
        <ScrollArea >
          <div className="flex max-h-190 flex-col gap-2 px-2">
            {items.map((item) => (
              <Item key={item.id}
                isAdded={selection.isSelected(item.id)}
                add={() => toggle(item)}
                product={item} />
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>
    </div>

  )
}

export function NoContent() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageX />
          </EmptyMedia>
          <EmptyTitle>No Product Added Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t added any product yet, Start adding products to
            your collection .
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
            >
              Add Product
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}


function Browse({
  hook,
  toggle
}: {
  hook: useListReturnType<Product>
  toggle: (item: Product) => void
}) {
  return (
    <div className="flex w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex w-full gap-3 ">
            <div className="flex relative w-full ">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="search for product"
                className="pl-8"
              ></Input>
            </div>
            <Button type="button">Browse &amp; Add Products</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col w-full sm:max-w-4xl h-[80vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle>Products</DialogTitle>
            <DialogDescription>Select products to add to your collection.</DialogDescription>
          </DialogHeader>
          <BrowseContent hook={hook} toggle={toggle} />
        </DialogContent>

      </Dialog>
    </div>
  )
}

function BrowseContent({
  hook,
  toggle
}: {
  hook: useListReturnType<Product>
  toggle: (item: Product) => void
}) {
  const items = hook.data;
  const pagination = hook.pagination;
  const meta = hook.meta;
  const selection = hook.draftSelection;

  const observerTarget = useInfiniteScroll({
    loading: hook.loading || false,
    hasMore: meta.hasMore || false,
    onLoadMore: pagination.next
  })


  return (
    <List list={hook}>
      <List.Toolbar>
        <List.Search resource="products" >
          {
            ({ search, setSearch }) => (
              <Row className="w-full items-center px-3">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
                <Button
                  onClick={() => pagination.next()}
                  variant="outline" size="sm">
                  <Search />
                </Button>
              </Row>
            )
          }
        </List.Search>
      </List.Toolbar>
      <List.Grid className="flex-1 gap-4 overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden  gap-2 py-2">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2 px-4">
              {items.map((item) => (
                <Item key={item.id}
                  isAdded={selection.isSelected(item.id)}
                  add={() => toggle(item)}
                  product={item} />
              ))}
              <InfiniteLoader ref={observerTarget} loading={hook.loading} hasMore={meta.hasMore} />
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      </List.Grid>
    </List >
  )
}

function Item({
  product,
  isAdded,
  add,
}: {
  product: Product;
  isAdded: boolean;
  add: () => void;
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
        onClick={add}
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
