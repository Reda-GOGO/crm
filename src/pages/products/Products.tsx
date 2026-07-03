import { Highlight } from "@/components/shared/Highlight";
import { PageLayout as Layout } from "../PageLayout";
import {
  Award,
  ChartNoAxesCombined,
  EllipsisVertical,
  Package,

} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { ProductImage } from "@/components/shared/ProductImage";
import { formatNumber } from "@/lib/utils";
import { Price } from "@/components/shared/Price";
import { useList } from "@/hooks/useList";
import { List, type Column } from "@/components/shared/listing/List";

const stats = [
  { labelKey: "products.statistics.productsSold", value: 100, Icon: Package },
  { labelKey: "products.statistics.topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "products.statistics.averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];

type Product = {
  image: string;
  name: string;
  price: number;
  id: number;
}


export default function Products() {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  const list = useList<Product>({
    type: "page",
    resource: "product",
  })
  const columns = [
    {
      key: "select",
      header: <Checkbox className={dir === "rtl" ? "mr-3" : ""} dir={dir} />,
      className: "w-10 px-3",
      cell: () => <Checkbox className={dir === "rtl" ? "mr-3" : ""} />,
    },
    {
      key: "name",
      header: t("Product"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (product) => (
        <div className="flex items-center gap-2">
          <ProductImage src={product.image} />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: t("Price"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (product) => (
        <Price value={formatNumber(product.price)} />
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
  ] satisfies Column<Product>[];
  return (
    <Layout
      Icon={Package}
      name="Product"
      showActions={true}>
      <Highlight
        titleKey="products.statistics.salesOverview"
        stats={stats}
      />
      <List
        list={list}
      >
        <List.Toolbar>
          <List.Search />
        </List.Toolbar>
        <List.Table columns={columns} />
      </List>
    </Layout>
  )
}

