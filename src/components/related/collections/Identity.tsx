import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Collection } from "@/types";
import { CalendarSync, Calendar, FolderOpen, Hash, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";


export function Identity({ collection }: { collection: Collection }) {
  const { i18n } = useTranslation()
  return (
    <Card className="overflow-hidden h-full ">
      <div className="p-4">
        <div className="relative aspect-square w-full overflow-hidden border bg-muted/30 rounded-lg">
          <ImageCard image={collection.image} />
        </div>
      </div>
      <CardContent className="space-y-5 pt-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {collection.archived && (
              <Badge variant="outline" className="border-zinc-300 text-zinc-500">
                Archived
              </Badge>
            )}
          </div>
          <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-foreground">
            {collection.name}
          </h1>
          <p className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            {collection.handle}
          </p>
        </div>

        {collection.description ? (
          <Textarea
            disabled
            value={collection.description}
            className="text-sm leading-relaxed text-muted-foreground" />
        ) : (
          <p className="text-sm italic text-muted-foreground/50">
            No description
          </p>
        )}

        <div>
          <span className="text-sm uppercase tracking-wider text-muted-foreground ">
            About this collection
          </span>
        </div>
        <Separator />

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              Articles
            </dt>
            <dd className="font-medium">
              {collection.products?.length} items
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Created At
            </dt>
            <dd className="font-mono text-muted-foreground">
              {new Date(collection.createdAt!).toLocaleDateString(i18n.language, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </dd>
          </div>


          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <CalendarSync className="h-4 w-4" />
              Last Updated
            </dt>
            <dd className="font-mono text-muted-foreground">
              {new Date(collection.createdAt!).toLocaleDateString(i18n.language, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}


export function ImageCard({ image }: { image?: string | null | undefined }) {
  if (image) {
    return (
      <img
        src={`${import.meta.env.VITE_API_URL}${image}`}
        alt={image}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle,theme(colors.border)_1px,transparent_1px)] bg-[length:16px_16px]">
      <Layers className="h-10 w-10 text-muted-foreground/30" />
      <span className="text-xs text-muted-foreground/50">No image uploaded</span>
    </div>
  );
}
