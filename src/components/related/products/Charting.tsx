import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", units: 186, revenue: 3200 },
  { month: "February", units: 305, revenue: 5100 },
  { month: "March", units: 237, revenue: 4300 },
  { month: "April", units: 273, revenue: 4700 },
  { month: "May", units: 309, revenue: 5600 },
  { month: "June", units: 314, revenue: 5900 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  units: {
    label: "Units sold",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function Charting({ product }: { product: { name: string } }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sales trend
          </CardTitle>
        </div>
        <CardDescription>{product.name} — last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 ">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.35}
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="units"
              type="natural"
              fill="var(--color-units)"
              fillOpacity={0.35}
              stroke="var(--color-units)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
          Trending up by 5.2% this month
        </div>
      </CardFooter>
    </Card>
  );
}
