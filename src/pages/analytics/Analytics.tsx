import { ChartNoAxesCombined } from "lucide-react";
import { Layout } from "../Layout";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation()
  return (
    <Layout
      name="Analytic"
      Icon={ChartNoAxesCombined}
      showActions={false}>
      <div>{t("Analytic.page.title")}</div>
    </Layout>
  )
}
