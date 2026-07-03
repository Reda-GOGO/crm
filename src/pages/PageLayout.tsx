import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  type LucideIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";



export function PageLayout({
  children,
  name,
  Icon,
  showActions = true,
}: {
  children: React.ReactNode;
  name: string;
  Icon: LucideIcon;
  showActions?: boolean;
}) {
  const { t } = useTranslation()
  return (
    <div className="w-full flex flex-col ">
      <div className="flex w-full justify-between gap-2 py-2">
        <TitleLayout title={t(name + ".page.title")} Icon={Icon} />
        <PageActions name={name} show={showActions} />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t(name + ".page.subtitle")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t(name + ".page.desc")}
        </p>
        {children}
      </div>
    </div>
  );
}


function PageActions({
  name,
  show
}: {
  name: string;
  show: boolean
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation()

  return (

    <div className={cn("flex gap-2",
      i18n.resolvedLanguage === "ar" ? "flex-row-reverse" : "flex-row",
      show ? "visible" : "invisible"
    )}>
      < DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="capitalize">
            {isMobile ? (
              <EllipsisVertical />
            ) : (
              <>
                <EllipsisVertical />
                {t("Actions")}
                <ChevronDown />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
      <Button
        onClick={() => navigate("/products/create")}
        size={"sm"}
        className="capitalize"
      >
        {t(name + ".page.create")}{" "}
      </Button>
    </div >
  )
}



export function TitleLayout({
  title,
  Icon,
}: { title: string; Icon: LucideIcon }) {
  const { i18n } = useTranslation()
  return (
    <div className="flex gap-1 items-center">
      <Icon />
      {i18n.resolvedLanguage === "ar" ? <ChevronLeft /> : <ChevronRight />}
      <span className="text-md capitalize font-semibold">{title}</span>
    </div>
  );
}
