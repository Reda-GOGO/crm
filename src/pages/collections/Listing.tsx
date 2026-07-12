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
import { createColumns } from "@/components/related/collections/createColumns";

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
  { labelKey: "productsSold", value: 100, Icon: Package },
  { labelKey: "topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];

export default function Listing() {

  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  const list = useList<Collection>({
    resource: "collections",
    mode: "page",
  })
  const columns = createColumns({ list });
  return (
    <Layout
      name="Collection"
      Icon={Library}
      showActions={true}>


      <Col className="px-2 gap-0">
        <Highlight.Header titleKey="Collection" />
        <Highlight.Content stats={stats} namespace="products.statistics." />
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
