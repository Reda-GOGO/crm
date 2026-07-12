import { ArrowUpRightIcon, ChartNoAxesCombined, ChartNoAxesCombinedIcon } from "lucide-react";
import { Layout } from "../Layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function Analytics() {
  const { t } = useTranslation()
  return (
    <Layout
      name="Analytic"
      Icon={ChartNoAxesCombined}
      showActions={false}>
      <div>{t("Analytic.page.title")}</div>
      <NoContent />
    </Layout>
  )
}



export function NoContent() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia >
            <ChartNoAxesCombinedIcon className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Analytics Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any analytics yet. Get started by commit
            some action .
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>Aggregate Analytics</Button>
            <Button variant="outline">Import Analytics</Button>
          </div>
        </EmptyContent>
        <Button variant="link" className="text-muted-foreground" size="sm">
          Learn More <ArrowUpRightIcon />
        </Button>
      </Empty>
    </div>
  );
}
