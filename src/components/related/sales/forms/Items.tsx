import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Package, PackageMinus, Search } from "lucide-react";

export function Items() {
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
              className="pl-8"
            ></Input>
          </div>
          <Button variant="outline" >
            Browse
          </Button>
          <Button variant="default" >
            Previous Sales
          </Button>
        </Row>
        <ItemsList />
      </CardContent>
    </Card>
  )
}

function ItemsList() {
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
    <div className="h-110 flex w-full items-center justify-center">
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
