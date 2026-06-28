import { Highlight } from "@/components/shared/Highlight";
import { PageLayout } from "../PageLayout";
import { Award, ChartNoAxesCombined, Package } from "lucide-react";

const stats = [
  { labelKey: "products.statistics.productsSold", value: 100, Icon: Package },
  { labelKey: "products.statistics.topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "products.statistics.averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];

export default function Products() {
  return (
    <PageLayout
      Icon={Package}
      name="Product"
      showActions={true}>
      <Highlight
        titleKey="products.statistics.salesOverview"
        stats={stats}
      />
    </PageLayout>
  )
}

