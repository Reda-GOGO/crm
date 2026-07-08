import { Highlight } from "@/components/shared/Highlight";
import { Layout } from "../Layout";
import {
  Award,
  ChartNoAxesCombined,
  EllipsisVertical,
  Eye,
  Package,
  Pencil,
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



export default function Listing() {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  const list = useList<Product>({
    resource: "products",
    mode: "page",
  })
  const navigate = useNavigate();
  const view = (product: Product) => navigate(`/products/${product.handle}`)
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
      cell: (product) => <Checkbox
        checked={list.selection.isSelected(Number(product.id))}
        onCheckedChange={
          () => list.selection.toggle(Number(product.id))
        } className={dir === "rtl" ? "mr-3" : ""} />,
    },
    {
      key: "name",
      header: t("Product"),
      className: dir === "rtl" ? "text-right" : "text-left",
      cell: (product) => (
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
      cell: (product) => (
        <Action product={product} />
      ),
    },
  ] satisfies Column<Product>[];


  return (
    <Layout
      Icon={Package}
      name="Product"
      showActions={true}
      renderActions={() => <Actions />}
    >

      <Highlight stats={stats} titleKey="products.statistics.salesOverview" />

      <List list={list}>
        <List.Toolbar>
          <List.Search resource="products" />
        </List.Toolbar>

        <List.Table
          getRowId={(product) => product.id}
          columns={columns}
        />

      </List>
    </Layout>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router";


function Action({ product }: { product: Product }) {
  const navigate = useNavigate();

  const edit = () => navigate(`/products/${product.handle}/edit`)
  const view = () => navigate(`/products/${product.handle}`)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={edit}><Pencil /> Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={view}><Eye /> View</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400"><Award /> Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function Actions() {


  return (
    <>
      <DropdownMenuItem ><Pencil /> Edit</DropdownMenuItem>
      <DropdownMenuItem ><Eye /> View</DropdownMenuItem>
      <DropdownMenuItem className="text-red-400"><Award /> Archive</DropdownMenuItem>
    </>
  )
}
