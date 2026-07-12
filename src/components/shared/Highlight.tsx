import { useTranslation } from "react-i18next";
import Row from "@/components/shared/Row";
import {
  Note,
  NoteContent,
  NoteHeader
} from "@/components/shared/Note";
import Col from "@/components/shared/Col";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type periodType = {
  id: string;
  titleKey: string;
}
type statsType = {
  labelKey: string;
  value: string | number | React.ReactNode;
  Icon: React.ComponentType<any>;
}

export function Highlight({
  titleKey,
  stats,
  namespace,
}: {
  titleKey: string;
  stats: Array<statsType>;
  namespace: string;
}) {


  return (
    <Col className="px-2 gap-0">
      <Header titleKey={namespace + titleKey} />
      <Content stats={stats} namespace={namespace} />
    </Col>
  );
}

Highlight.Header = Header;
Highlight.Content = Content;

export function Content({
  stats,
  namespace,
}: {
  stats: Array<{
    labelKey: string;
    value: string | number | React.ReactNode;
    Icon: React.ComponentType<any>;
  }>;
  namespace: string;
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
  return (
    <ScrollArea className="w-full pb-4">
      <Row className="min-w-max gap-2">
        {stats.map((stat) => (
          <Note key={stat.labelKey} dir={dir}>
            <NoteHeader label={t(namespace + stat.labelKey)} />

            <NoteContent className="flex items-center justify-between">
              <div className="font-bold">{stat.value}</div>

              {stat.Icon && (
                <stat.Icon className="h-5 w-5 text-muted-foreground" />
              )}
            </NoteContent>
          </Note>
        ))}
      </Row>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  )
}



function Header({
  titleKey,
}: {
  titleKey: string;
}) {
  const periods = [
    { id: "today", titleKey: "periods.today" },
    { id: "7days", titleKey: "periods.sevenDays" },
    { id: "30days", titleKey: "periods.thirtyDays" },
  ];
  const { t, i18n } = useTranslation();
  const [activePeriod, setActivePeriod] = useState<periodType>(periods[0]);
  const todayDate = useMemo(() => {
    return new Intl.DateTimeFormat(i18n.language, {
      month: "short",
      day: "numeric",
    }).format(new Date());
  }, [i18n.language]);

  const subtitle = useMemo(() => {
    switch (activePeriod.id) {
      case "today":
        return t("periods.todaySubtitle", {
          date: todayDate,
        });

      case "7days":
        return t("periods.lastDaysSubtitle", { count: 7 });

      case "30days":
        return t("periods.lastDaysSubtitle", { count: 30 });

      default:
        return "";
    }
  }, [activePeriod.id, t, todayDate]);
  return (
    <Row className="items-center justify-between h-20">
      <Col className="gap-0.5">
        <span className="text-lg font-semibold">
          {t(titleKey)}
        </span>

        <span className="text-sm text-muted-foreground">
          {subtitle}
        </span>
      </Col>

      <Row>
        {periods.map((period) => (
          <Button
            className="border border-muted-foreground"
            key={period.id}
            onClick={() => setActivePeriod(period)}
            variant={period.id === activePeriod.id ? "default" : "secondary"}
          >
            {t(period.titleKey)}
          </Button>
        ))}
      </Row>
    </Row>

  )
}
