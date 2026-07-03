import {
  Award,
  ChartNoAxesCombined,
  Package,
  ShoppingCart,
  TrendingUp,
  Wallet
} from "lucide-react";
import { PageLayout } from "../PageLayout";
import { Highlight } from "@/components/shared/Highlight";
import { formatNumber } from "@/lib/utils";
import { Price } from "@/components/shared/Price";

const stats = [
  { labelKey: "orders.statistics.totalOrders", value: 208, Icon: ShoppingCart },
  { labelKey: "orders.statistics.revenue", value: <Price value={formatNumber("8300.58")} />, Icon: Wallet },
  { labelKey: "orders.statistics.profit", value: <Price value={formatNumber(2700000.4)} />, Icon: TrendingUp },
  { labelKey: "orders.statistics.productsSold", value: 100, Icon: Package },
  { labelKey: "orders.statistics.averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
  { labelKey: "orders.statistics.topSellingProduct", value: "Ecrous 6m", Icon: Award },
];
export default function Orders() {
  return (
    <PageLayout
      name="Order"
      Icon={ShoppingCart}
      showActions={true}>
      <Highlight
        titleKey="orders.statistics.salesOverview"
        stats={stats}
      />
    </PageLayout>
  )
}
