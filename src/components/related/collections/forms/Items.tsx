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
import { Loader2, Package, PackageX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useList } from "@/hooks/useList";
import type { Product } from "@/types";
import { List } from "@/components/shared/listing/List";
import { ProductImage } from "@/components/shared/ProductImage";
import Row from "@/components/shared/Row";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { forwardRef } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function Items() {
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
          <Browse />
          <NoContent />
        </div>
      </CardContent>
    </Card>
  )
}

export function ItemContent() {
  return (
    <div>items listing go here </div>
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


function Browse() {
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
        <DialogContent className="flex flex-col w-full sm:max-w-4xl h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle>Products</DialogTitle>
            <DialogDescription>Select products to add to your collection.</DialogDescription>
          </DialogHeader>
          <BrowseContent />
        </DialogContent>

      </Dialog>
    </div>
  )
}

function BrowseContent() {
  const hook = useList<Product>({
    resource: "products",
    mode: "infinite",
    limit: 10,
  })
  const items = hook.data;
  const pagination = hook.pagination;
  const meta = hook.meta;

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
                  Load More
                </Button>
              </Row>
            )
          }
        </List.Search>
      </List.Toolbar>
      <List.Grid className="flex-1 gap-4 overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden px-3 gap-2 py-2">
          <ScrollArea className="h-full ">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <Item key={item.id} product={item} />
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

function Item({ product }: { product: Product }) {
  return (
    <Row className="w-full rounded-lg p-2 border ">
      <ProductImage src={product.image!} className="w-16 h-16" />
      <span>{product.name}</span>
    </Row>
  )
}


const InfiniteLoader = forwardRef<
  HTMLDivElement,
  {
    loading: boolean;
    hasMore: boolean;
  }
>(({ loading, hasMore }, ref) => (
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
));
