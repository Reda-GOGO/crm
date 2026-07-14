import Back from "@/components/shared/Back";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/hooks/useQuery";
import { http } from "@/infrastructure/http";
import {
  EllipsisVertical,
  Pencil,
  FilePlus2,
} from "lucide-react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import type { Product } from "@/types";
import Row from "@/components/shared/Row";
import { Button } from "@/components/ui/button";

import {
  Overview,
  Charting,
  Identity,
} from "@/components/related/products";
import { useTranslation } from "react-i18next";


export default function Single() {
  const { handle } = useParams();
  const queryFn = useCallback(() => {
    return http.get<Product>("/products/" + handle);
  }, [handle]);
  const { data, error, loading } = useQuery<Product>(queryFn);

  if (loading) return <Back><Loading /></Back>
  if (error) return <Back className="h-full"><NotFound /></Back>
  if (data) return <Back><Content product={data} /></Back>

}

function Content({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl ">
      <Action />
      <div className="grid grid-cols-12 gap-6 pb-10">
        <div className="col-span-12 lg:col-span-5  ">
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

function Action() {
  const navigate = useNavigate();
  const { handle } = useParams();
  const { t, i18n } = useTranslation()
  const dir = i18n.language === "ar" ? "rtl" : "ltr"
  return (
    <div className="w-full flex h-15 items-center justify-end">

      <Row className={dir === "rtl" ? "flex-row-reverse" : ""}>
        <Button variant="outline" >
          <EllipsisVertical />
          <span >{t("Actions")}</span>
        </Button>
        <Button
          onClick={() => navigate(`/products/${handle}/edit`)}
        >
          <Pencil />
          <span >{t("Edit")}</span>
        </Button>
      </Row>
    </div>
  )
}



function Loading() {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <Card className="overflow-hidden">
            <div className="w-full rounded-xl p-4">
              <Skeleton className="aspect-square w-full rounded-none" />
            </div>
            <CardContent className="space-y-4 pt-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
          <Skeleton className="h-144 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl h-full flex-col items-center justify-center gap-3 py-24 text-center">
      <div
        className="flex items-center justify-center h-20 w-20 rounded-full bg-muted"
      >
        <FilePlus2 className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-medium">Product not found</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        This product may have been deleted or the link is out of date.
      </p>
      <Button variant="link" asChild>
        <span>Go back </span>
      </Button>
    </div>
  );
}
