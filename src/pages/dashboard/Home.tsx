import { useTranslation } from "react-i18next"
import { Layout } from "../Layout";
import { LayoutDashboard } from "lucide-react";

export default function Home() {
  const { t } = useTranslation()
  return (
    <Layout
      Icon={LayoutDashboard}
      name="Dashboard"
      showActions={false}>
      <div>
        <h1 className="">{t("hello")}</h1>
      </div>
    </Layout>
  )
}
