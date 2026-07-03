import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Price({
  value,
  className = "",
}: {
  value: string;
  className?: string
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  return (
    <div
      dir="ltr"
      className={
        cn(
          "flex  items-center gap-3 ",
          dir === "ltr" ? "flex-row" : "flex-row-reverse",
          className
        )
      }
    >
      <span> {value}</span>
      <span>{t("MAD")}</span>
    </div>
  );
}
