"use client"

import { Home, Vote, Settings, HelpCircle, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Elections",
    url: "/dashboard/elections",
    icon: Vote,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1d4ed8] to-[#3b82f6] rounded-lg flex items-center justify-center">
            <Vote className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">iElect</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-12 px-4 hover:bg-[#60a5fa]/20 data-[active=true]:bg-[#1d4ed8] data-[active=true]:text-white"
                  >
                    <Link href={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6">
          <Button className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white" asChild>
            <Link href="/dashboard/elections/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Election
            </Link>
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
