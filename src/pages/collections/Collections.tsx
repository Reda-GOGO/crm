import { Library } from "lucide-react";
import { PageLayout } from "../PageLayout";
import { useTranslation } from "react-i18next";

export default function Collections() {
  const { t } = useTranslation()
  return (
    <PageLayout
      name="Collection"
      Icon={Library}
      showActions={true}>
      <div>{t("Collection.page.title")}</div>
    </PageLayout>
  )
}
