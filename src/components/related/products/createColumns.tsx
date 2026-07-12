import type { Column } from "@/components/shared/listing/List";
import { Price } from "@/components/shared/Price";
import { ProductImage } from "@/components/shared/ProductImage";
import { Checkbox } from "@/components/ui/checkbox";
import type { useListReturnType } from "@/hooks/useList";
import { formatNumber } from "@/lib/utils";
import { useTranslation } from "react-i18next";
type Product = {
  id: number;
  name: string;
  handle: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  archived: boolean;
  cost: number;
  price: number;
  collectionId: number | null;
  Collection: {
    handle: string;
    name: string;
  };
}

export function createColumns({
  list,
  view,
  Action
}: {
  list: useListReturnType<Product>;
  view: (product: Product) => void;
  Action: ({ product }: { product: Product }) => React.ReactNode;
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
      cell: (product: Product) => <Checkbox
        checked={list.selection.isSelected(Number(product.id))}
        onCheckedChange={
          () => list.selection.toggle(Number(product.id))
        } className={dir === "rtl" ? "mr-3" : ""} />,
    },
    {
      key: "name",
      header: t("Product"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (product: Product) => (
        <div
          onClick={() => view(product)}
          className="flex items-center gap-2 min-w-80">
          <ProductImage src={product.image!} />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: t("Price"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (product) => (
        <div onClick={() => view(product)}>
          <Price value={formatNumber(product.price)} />
        </div>
      ),
    },
    {
      key: "action",
      header: t("Actions"),
      className: "w-20 px-4",
      cell: (product: Product) => (
        <Action product={product} />
      ),
    },
  ] satisfies Column<Product>[];
}



