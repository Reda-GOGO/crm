import {
  Award,
  ChartNoAxesCombined,
  EllipsisVertical,
  Library,
  Package
} from "lucide-react";
import { Layout } from "../Layout";
import { useTranslation } from "react-i18next";
import { useList } from "@/hooks/useList";
import { ProductImage } from "@/components/shared/ProductImage";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { List, type Column } from "@/components/shared/listing/List";
import { Highlight } from "@/components/shared/Highlight";
import Col from "@/components/shared/Col";

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


const stats = [
  { labelKey: "products.statistics.productsSold", value: 100, Icon: Package },
  { labelKey: "products.statistics.topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "products.statistics.averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];

export default function Listing() {

  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  const list = useList<Collection>({
    resource: "collections",
    mode: "page",
  })
  const columns = [
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
        <div className="flex items-center gap-2">
          <ProductImage src={collection.image!} />
          <span>{collection.name}</span>
        </div>
      ),
    },
    {
      key: "products",
      header: t("Products"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (collection) => (
        <div className="flex gap-2">
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
      cell: () => (
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      ),
    },
  ] satisfies Column<Collection>[];
  return (
    <Layout
      name="Collection"
      Icon={Library}
      showActions={true}>


      <Col className="px-2 gap-0">
        <Highlight.Header titleKey="Collection" />
        <Highlight.Content stats={stats} />
      </Col>

      <List list={list}>
        <List.Toolbar>
          <List.Search resource="collections" />
        </List.Toolbar>

        <List.Table
          getRowId={(collection) => collection.id}
          columns={columns}
        />

      </List>

    </Layout>
  )
}
