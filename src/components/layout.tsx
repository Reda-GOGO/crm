import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { data } from "@/components/app-sidebar"
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useTheme } from "@/contexts/theme";
import {
  Sun,
  Moon,
  Expand,
  Minimize
} from "lucide-react";

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2 
          transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full ">
            <SidebarTrigger className="-ml-1" />
            <Search />
            <ThemeToggle />
            <FullscreenToggle />
          </div>
        </header>


        <main className="h-full">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider >
  )
}




export function Search() {
  const [open, setOpen] = React.useState(false)
  const items = data.navMain
  const suggestions = items.slice(0, 4)
  const performance = items.slice(4, 6)
  const settings = items.slice(6, 8)
  const { t, i18n } = useTranslation()
  const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"
  const navigate = useNavigate()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (

    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex w-full items-center justify-center">
        <div
          className="flex border rounded-lg p-2 max-sm:pr-1 w-full max-w-200 cursor-pointer justify-between items-center"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm  text-muted-foreground truncate">
            {" "}
            {t("ComboTitle")}
          </p>
          <p className="text-muted-foreground text-sm max-sm:text-xs max-sm:hidden">
            {t("Press")}{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="max-w-lg rounded-lg border" dir={dir} >
          <CommandInput placeholder={t("ComboSearchPlaceholder")} dir={dir} />
          <CommandList >
            <CommandEmpty>{t("No-Results")}</CommandEmpty>
            <CommandGroup heading={t("Suggestions")}>
              {
                suggestions.map((item) => {
                  return (
                    (
                      <CommandItem
                        onSelect={() => {
                          navigate(item.url)
                          setOpen(false)
                        }}
                        key={item.title}>
                        {item.icon}
                        <span>{t(item.title)}</span>
                      </CommandItem>
                    )
                  )
                })
              }
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading={t("Analytics-Performance")}>
              {
                performance.map((item) => {
                  return (
                    (
                      <CommandItem
                        onSelect={() => {
                          navigate(item.url)
                          setOpen(false)
                        }}
                        key={item.title}>
                        {item.icon}
                        <span>{t(item.title)}</span>
                      </CommandItem>
                    )
                  )
                })
              }
            </CommandGroup>
            <CommandSeparator />

            <CommandGroup heading={t("Settings")}>
              {
                settings.map((item) => {
                  return (
                    (
                      <CommandItem
                        onSelect={() => {
                          navigate(item.url)
                          setOpen(false)
                        }}
                        key={item.title}>
                        {item.icon}
                        <span>{t(item.title)}</span>
                      </CommandItem>
                    )
                  )
                })
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}



export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="transition-all duration-300 rounded-full relative"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${theme === "light"
          ? "scale-100 rotate-0 opacity-100"
          : "scale-0 -rotate-90 opacity-0"
          }`}
      />

      <Moon
        className={`h-5 w-5 transition-all duration-300 absolute ${theme === "dark"
          ? "scale-100 rotate-0 opacity-100"
          : "scale-0 rotate-90 opacity-0"
          }`}
      />
    </Button>
  );
}






export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    function handleChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFullscreen}
      className="relative transition-all rounded-full"
    >
      <Expand
        className={`h-5 w-5 transition-all duration-300 ${!isFullscreen
          ? "opacity-100 scale-100 rotate-0"
          : "opacity-0 scale-0 rotate-90"
          }`}
      />

      <Minimize
        className={`absolute h-5 w-5 transition-all duration-300 ${isFullscreen
          ? "opacity-100 scale-100 rotate-0"
          : "opacity-0 scale-0 -rotate-90"
          }`}
      />
    </Button>
  );
}
