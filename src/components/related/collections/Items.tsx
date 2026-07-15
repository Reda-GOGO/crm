import Col from "@/components/shared/Col"
import { Note, NoteContent, NoteHeader } from "@/components/shared/Note"
import { ProductImage } from "@/components/shared/ProductImage"
import Row from "@/components/shared/Row"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Collection, Product } from "@/types"
import { Package, CircleCheck, CircleOff, Hash, PackageCheck, PackageX } from "lucide-react"

export function Items({ collection }: { collection: Collection }) {

  return (
    <div className="w-full flex flex-col gap-3">
      <Header collection={collection} />
      <Content collection={collection} />
    </div>
  )
}

function Header({ collection }: { collection: Collection }) {
  const items = collection.products ?? [];
  const actives = items.filter((item) => !item.archived);
  const archives = items.filter((item) => item.archived);
  return (
    <Col className="gap-4">
      <div className="flex flex-col">
        <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Overview
        </span>
        <span className="text-sm text-muted-foreground">
          View pricing, availability, and details for products in - <b>{collection.name}</b> collection.
        </span>
      </div>

      <ScrollArea>
        <Row>
          <Note className="min-w-40">
            <NoteHeader label="Total" />
            <NoteContent className="flex items-center justify-between">
              {items.length} {items.length === 1 ? "product" : "products"}
              <Package className="h-5 w-5" />
            </NoteContent>
          </Note>


          <Note className="min-w-40">
            <NoteHeader label="Active" />
            <NoteContent className="flex items-center justify-between">
              {actives.length} {actives.length === 1 ? "product" : "products"}
              <PackageCheck className="h-5 w-5" />
            </NoteContent>
          </Note>


          <Note className="min-w-40">
            <NoteHeader label="Archive" />
            <NoteContent className="flex items-center justify-between">
              {archives.length} {archives.length === 1 ? "product" : "products"}
              <PackageX className="h-5 w-5" />
            </NoteContent>
          </Note>
        </Row>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Col>
  )
}

function Content({ collection }: { collection: Collection }) {
  const items = collection.products ?? []
  return (
    <div className="w-full h-170 pt-4 border">

      <ScrollArea>
        <Col className="max-h-165 gap-2 px-2 ">
          {
            items.length > 0 ?
              items.map((item) => (
                <Item key={item.id} item={item} />
              )) :
              <NoContent />
          }
        </Col>
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}

function Item({ item }: { item: Product }) {
  const isArchived = item.archived

  return (
    <div className="group flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors hover:border-foreground/20 hover:bg-muted/40">
      <Row className="min-w-0 flex-1 gap-3">
        <ProductImage
          src={item.image!}
          className="h-16 w-16 shrink-0 rounded-md border object-cover"
        />

        <Col className="min-w-0 flex-1 justify-center gap-1.5">
          <span className="truncate font-medium leading-none">
            {item.name}
          </span>

          <Row className="items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1 text-muted-foreground">
              <Hash className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-sm">{item.handle}</span>
            </div>

          </Row>
        </Col>
      </Row>

      <Badge
        variant="outline"
        className={cn(
          "shrink-0 gap-1 font-normal",
          isArchived
            ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950 dark:text-rose-400"
            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950 dark:text-emerald-400"
        )}
      >
        {isArchived ? (
          <CircleOff className="h-3.5 w-3.5" />
        ) : (
          <CircleCheck className="h-3.5 w-3.5" />
        )}
        {isArchived ? "Archived" : "Active"}
      </Badge>
    </div>
  )
}

function NoContent() {
  return (
    <div className="flex h-160 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-2 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <PackageX className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm uppercase font-semibold ">No products in this collection yet</p>
        <p className="text-sm text-muted-foreground">
          Add products to see them listed here.
        </p>
      </div>
    </div>
  )
}
