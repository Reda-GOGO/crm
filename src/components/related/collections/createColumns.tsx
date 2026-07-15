import type { Column } from "@/components/shared/listing/List";
import { ProductImage } from "@/components/shared/ProductImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { useListReturnType } from "@/hooks/useList";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
type Collection = {
  name: string;
  id: number;
  handle: string;
  image: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  tags: string | null;
  _count: {
    products: number;
  }
}

export function createColumns({
  list,
  view,
  Action
}: {
  list: useListReturnType<Collection>;
  view?: (product: Collection) => void;
  Action?: ({ collection }: { collection: Collection }) => React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  return [
    {
      key: "select",
      header: <Checkbox
        onCheckedChange={
          () => list.selection.toggleAll(list.data.map((e) => e.id))
        }
        className={dir === "rtl" ? "mr-3" : ""}
        dir={dir} />,
      className: "w-10 px-3",
      cell: (collection) => <Checkbox
        checked={list.selection.isSelected(Number(collection.id))}
        onCheckedChange={
          () => list.selection.toggle(Number(collection.id))
        }
        className={dir === "rtl" ? "mr-3" : ""} />,
    },
    {
      key: "name",
      header: t("Collection"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (collection) => (
        <div
          onClick={() => view ? view(collection) : null}
          className="flex items-center gap-2">
          <ProductImage src={collection.image!} />
          <span>{collection.name}</span>
        </div>
      ),
    },
    {
      key: "products",
      header: t("Products"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (collection: Collection) => (
        <div
          onClick={() => view ? view(collection) : null}
          className="flex gap-2">
          <span>
            {collection._count.products}
          </span>
          <span>
            {t("Items")}
          </span>
        </div>
      ),
    },
    {
      key: "action",
      header: t("Actions"),
      className: "w-20 px-4",
      cell: (collection: Collection) => (
        Action ? <Action collection={collection} /> :
          (

            <Button variant="ghost" size="sm">
              <EllipsisVertical />
            </Button>
          )
      ),
    },
  ] satisfies Column<Collection>[];

}



