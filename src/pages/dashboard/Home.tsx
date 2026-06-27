import { useTranslation } from "react-i18next"

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
}


export default function Home() {
  const { t, i18n } = useTranslation()
  console.log(i18n)
  return (
    <div>
      <LanguageSwitcher />
      <h1 className="">{t("hello")}</h1>
    </div>
  )
}
