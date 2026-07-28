import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, ListFilter, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import Row from "@/components/shared/Row";
import type { useListReturnType } from "@/hooks/useList";
import type { Product } from "@/types";
import { List } from "@/components/shared/listing/List";
import { forwardRef } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { useSaleFormReturnType } from "@/hooks/forms/useSaleForm";
import { Line } from "./Line";


type useBooleanType = {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export function Browser({
  open,
  list,
  form,
}: {
  open: useBooleanType
  list: useListReturnType<Product>
  form: useSaleFormReturnType
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

        <Content list={list} form={form} />

        <DialogFooter className="mb-0 mx-0">

          <Button onClick={() => open.off()} variant="outline">Cancel</Button>
          <Button onClick={() => open.off()} variant="default">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}


function Content({
  list,
  form,
}: {
  list: useListReturnType<Product>;
  form: useSaleFormReturnType;
}) {
  const items = list.data;
  const pagination = list.pagination;
  const meta = list.meta;

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
                    <span className="text-sm">All</span>
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
                  <Line key={item.id}
                    line={form.actuallines.actions.get(item.id)}
                    actions={form.actuallines.actions}
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
