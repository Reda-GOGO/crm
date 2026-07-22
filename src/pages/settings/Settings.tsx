import { Settings2 } from "lucide-react";
import { Layout } from "../Layout";
import { useTranslation } from "react-i18next";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Settings() {
  const { t } = useTranslation()
  return (
    <Layout
      translationKey="Setting"
      urlPrefix="settings"
      Icon={Settings2}
      showActions={false}>
      <div>{t("Setting.page.title")}</div>
      <LanguageSwitcher />
    </Layout>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  console.log("i18n.changeLanguage", i18n.language);
  const handleChange = (value: string) => {
    console.log("handleChange", value);
    i18n.changeLanguage(value);
  };
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>{t("language")}</FieldLabel>

      <Select
        value={i18n.language}
        onValueChange={handleChange}
      >
        <SelectTrigger dir={dir}>
          <SelectValue placeholder="Choose language" />
        </SelectTrigger>

        <SelectContent dir={dir}>
          <SelectGroup>
            {languages.map((lang) => (
              <SelectItem
                key={lang.code}
                value={lang.code}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <FieldDescription dir={dir}>
        {t("selectLanguage")}
      </FieldDescription>
    </Field>
  );
}
