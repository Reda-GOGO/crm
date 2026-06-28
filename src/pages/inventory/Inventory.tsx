import { Layers2 } from "lucide-react";
import { PageLayout } from "../PageLayout";
import { useTranslation } from "react-i18next";

export default function Inventory() {
  const { t } = useTranslation()
  return (
    <PageLayout
      name="Inventory"
      Icon={Layers2}
      showActions={true}>
      <div>{t("Inventory.page.title")}</div>
    </PageLayout>
  )
}
