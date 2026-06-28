import { useTranslation } from "react-i18next"
import { PageLayout } from "../PageLayout";
import { LayoutDashboard } from "lucide-react";

export default function Home() {
  const { t } = useTranslation()
  return (
    <PageLayout
      Icon={LayoutDashboard}
      name="Dashboard"
      showActions={false}>
      <div>
        <h1 className="">{t("hello")}</h1>
      </div>
    </PageLayout>
  )
}
