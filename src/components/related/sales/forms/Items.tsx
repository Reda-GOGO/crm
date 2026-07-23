import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Package, PackageMinus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useBoolean } from "@/hooks/useBoolean";
import { Browser } from "./Browser";
import { useList } from "@/hooks/useList";
import type { Product } from "@/types";



export function Items() {
  const open = useBoolean();
  const list = useList<Product>({
    resource: "products",
    mode: "infinite",
    limit: 10,
  });
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Package className="h-3.5 w-3.5 text-primary" />
          Products
        </CardTitle>
        <CardDescription>
          Products associated with the sale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <Row className="w-full justify-between">
          <div
            className="flex relative w-full"
          >
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="search for product"
              onFocus={() => open.on()}
              className="pl-8"
            ></Input>
          </div>
          <Row>
            <Browser open={open} list={list} />
            <PreviousSales />
          </Row>
        </Row>
        <SaleItems />
      </CardContent>
    </Card>
  )
}



function PreviousSales() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"default"}>
          Previous Sales
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col w-full sm:max-w-4xl h-[90vh] p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>Previous Sales</DialogTitle>
          <DialogDescription>Select from previous sales products to add to the order.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}



function SaleItems() {
  return (
    <div className="w-full">
      <div className="flex w-full">
        <span className="text-sm uppercase text-muted-foreground">
          0 Selected Items
        </span>
      </div>
      <NoItems />
    </div>

  )
}


function NoItems() {
  return (
    <div className="h-130 flex w-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageMinus />
          </EmptyMedia>
          <EmptyTitle>No Product Added Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t added any product yet, Start adding products to
            your collection .
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              Add Product
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
