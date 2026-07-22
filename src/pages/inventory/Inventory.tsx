import { Layers2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Layout } from "../Layout";

export default function Inventory() {
  const { t } = useTranslation()
  return (
    <Layout
      translationKey="Inventory"
      urlPrefix="inventory"
      Icon={Layers2}
      showActions={true}>
      <div>{t("Inventory.page.title")}</div>
    </Layout>
  )
}
