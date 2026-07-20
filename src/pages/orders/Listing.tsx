import {
  Award,
  ChartNoAxesCombined,
  Package,
  ShoppingCart,
  TrendingUp,
  Wallet
} from "lucide-react";

import { Layout } from "../Layout";
import { Highlight } from "@/components/shared/Highlight";
import { formatNumber } from "@/lib/utils";
import { Price } from "@/components/shared/Price";
import { useList } from "@/hooks/useList";
import type { Order } from "@/types";
import { createColumns } from "@/components/related/orders/createColumns";
import { List } from "@/components/shared/listing/List";

const stats = [
  { labelKey: "totalOrders", value: 208, Icon: ShoppingCart },
  { labelKey: "revenue", value: <Price value={formatNumber("8300.58")} />, Icon: Wallet },
  { labelKey: "profit", value: <Price value={formatNumber(2700000.4)} />, Icon: TrendingUp },
  { labelKey: "productsSold", value: 100, Icon: Package },
  { labelKey: "averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
  { labelKey: "topSellingProduct", value: "Ecrous 6m", Icon: Award },
];

export default function Listing() {
  const list = useList<Order>({
    resource: "orders",
    mode: "page",
  })
  const columns = createColumns({ list })
  return (
    <Layout
      name="Order"
      Icon={ShoppingCart}
      showActions={true}>
      <Highlight
        namespace="orders.statistics."
        titleKey="salesOverview"
        stats={stats}
      />

      <List list={list}>
        <List.Toolbar>
          <List.Search resource="orders" />
        </List.Toolbar>

        <List.Table
          getRowId={(order) => order.id}
          columns={columns}
        />

      </List>
    </Layout>
  )
}
