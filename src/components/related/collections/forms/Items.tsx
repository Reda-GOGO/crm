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
import { Package, PackageX } from "lucide-react";

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
        <NoContent />
      </CardContent>
    </Card>
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

