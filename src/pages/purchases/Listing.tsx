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

const stats = [
  { labelKey: "totalOrders", value: 208, Icon: ShoppingCart },
  { labelKey: "revenue", value: <Price value={formatNumber("8300.58")} />, Icon: Wallet },
  { labelKey: "profit", value: <Price value={formatNumber(2700000.4)} />, Icon: TrendingUp },
  { labelKey: "productsSold", value: 100, Icon: Package },
  { labelKey: "averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
  { labelKey: "topSellingProduct", value: "Ecrous 6m", Icon: Award },
];

export default function Listing() {
  return (
    <Layout
      urlPrefix="purchases"
      translationKey="Order"
      Icon={ShoppingCart}
      showActions={true}>

      <Highlight
        namespace="orders.statistics."
        titleKey="salesOverview"
        stats={stats}
      />

    </Layout>
  )
}
