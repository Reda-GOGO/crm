import * as React from "react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  KeyRound,
  Settings2,
  ChartNoAxesCombined,
  Layers2,
  LayoutDashboard,
  Package,
  Library,
  ShoppingCart
} from "lucide-react"
import { useTranslation } from "react-i18next"

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Ste Placo Top sarl",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [

    {
      title: "Dashboard",
      url: "/",
      icon: (
        <LayoutDashboard />
      ),
      isActive: true,
      items: [],
    },

    {
      title: "Products",
      url: "/products",
      icon: (
        <Package />
      ),
      items: [],
    },
    {
      title: "Collections",
      url: "/collections",
      icon: (
        <Library />
      ),
      items: [],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: (

        <ShoppingCart />
      ),
      items: [],
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: (
        <Layers2 />
      ),
      items: [],
      // isActive: true,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: (
        <ChartNoAxesCombined />
      ),
      items: [],
    },
    {
      title: "Settings",
      url: "/setting",
      icon: (
        <Settings2 />
      ),
      items: [],
    },
    {
      title: "Team & Permission",
      url: "/teams",
      icon: (
        <KeyRound />
      ),
      items: [],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <MapIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { i18n } = useTranslation()
  return (
    <Sidebar
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}
      side={i18n.resolvedLanguage === "ar" ? "right" : "left"}
      collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
