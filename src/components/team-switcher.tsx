
import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTranslation } from "react-i18next"



export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  if (!activeTeam) return null

  const { t } = useTranslation()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex w-full items-center gap-3">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sidebar-primary-foreground">
              {activeTeam.logo}
            </div>

            <div className="grid min-w-0 flex-1 text-start text-sm leading-tight">
              <span className="truncate font-medium">
                {activeTeam.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {t("Enterprise")}
              </span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

