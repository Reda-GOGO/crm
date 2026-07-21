import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router"

type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}


export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const { t } = useTranslation()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("Platform")}</SidebarGroupLabel>
      <SidebarMenu>
        {
          items.map((item) =>
            item.items?.length ?
              (<Multiple key={item.title} item={item} />) : (<Single key={item.title} item={item} />)
          )
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}

function Multiple({ item }: { item: NavItem }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/")
  return (
    <Collapsible
      asChild
      open={active}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={() => navigate(item.url)}
            tooltip={t(item.title)}>
            {item.icon}
            <span>{t(item.title)}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const subActive = location.pathname === subItem.url || location.pathname.startsWith(subItem.url + "/")
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    isActive={subActive}
                    onClick={() => navigate(subItem.url)}
                    asChild>
                    <span>{t(subItem.title)}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function Single({ item }: { item: NavItem }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/")
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        onClick={() => navigate(item.url)}
        tooltip={t(item.title)}>
        {item.icon}
        <span>{t(item.title)}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}


