import Back from "@/components/shared/Back";
import { Price } from "@/components/shared/Price";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/hooks/useQuery";
import { http } from "@/infrastructure/http";
import { formatNumber } from "@/lib/utils";
import {
  Package,
  Tag,
  Info,
  EllipsisVertical,
  Pencil,
} from "lucide-react";
import { useCallback } from "react";
import { useParams } from "react-router";
import { Identity } from "@/components/related/products/Identity";
import type { Product } from "@/types";
import { Charting } from "@/components/related/products/Charting";
import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";



export default function Single() {
  const { handle } = useParams();
  const queryFn = useCallback(() => {
    return http.get<Product>("/products/" + handle);
  }, [handle]);
  const { data, error, loading } = useQuery<Product>(queryFn);

  return (
    <Back>
      {loading && <Loading />}
      {data && <Content product={data} />}
      {error && <NotFound />}
    </Back>
  );
}

function Action() {
  return (
    <div className="w-full flex h-15 items-center justify-end">

      <Row >
        <Button variant="outline" >
          <EllipsisVertical />
          <span >Actions</span>
        </Button>
        <Button  >
          <Pencil />
          <span >Edit</span>
        </Button>
      </Row>
    </div>
  )
}

function Content({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl ">
      <Action />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-6 lg:self-start">
          <Identity product={product} />
        </div>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
          <Overview product={product} />
          <Charting product={product} />
        </div>
      </div>
    </div>
  );
}




function Overview({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Overview
          </CardTitle>
        </div>
        <CardDescription>{product.name} — last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="divide-y divide-border rounded-lg border">
          {product.units.map((unit) => (
            <div key={unit.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{unit.name}</span>
                  {unit.isBase ? (
                    <span className="text-xs text-muted-foreground">default</span>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">
                      {product.unit} × {formatNumber(1 / unit.quantityInBase)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Cost</span>
                  <Price value={formatNumber(unit.cost)} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <Price value={formatNumber(unit.price)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


function Loading() {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <Card className="overflow-hidden">
            <Skeleton className="aspect-square w-full rounded-none" />
            <CardContent className="space-y-4 pt-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-3 py-24 text-center">
      <Package className="h-10 w-10 text-muted-foreground/40" />
      <h2 className="text-lg font-medium">Product not found</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        This product may have been deleted or the link is out of date.
      </p>
    </div>
  );
}
