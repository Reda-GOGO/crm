import { KeyRound } from "lucide-react";
import { Layout } from "../Layout";
import { useTranslation } from "react-i18next";

export default function Teams() {
  const { t } = useTranslation()
  return (
    <Layout
      translationKey="Team"
      urlPrefix="teams"
      Icon={KeyRound}
      showActions={true}>
      <div>{t("Team.page.title")}</div>
    </Layout>
  )
}
