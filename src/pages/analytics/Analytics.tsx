import { ChartNoAxesCombined } from "lucide-react";
import { PageLayout } from "../PageLayout";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation()
  return (
    <PageLayout
      name="Analytic"
      Icon={ChartNoAxesCombined}
      showActions={false}>
      <div>{t("Analytic.page.title")}</div>
    </PageLayout>
  )
}
