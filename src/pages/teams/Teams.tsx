import { KeyRound } from "lucide-react";
import { PageLayout } from "../PageLayout";
import { useTranslation } from "react-i18next";

export default function Teams() {
  const { t } = useTranslation()
  return (
    <PageLayout
      name="Team"
      Icon={KeyRound}
      showActions={true}>
      <div>{t("Team.page.title")}</div>
    </PageLayout>
  )
}
