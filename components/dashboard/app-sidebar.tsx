"use client"

import { GraduationCap, LayoutDashboard, Users, FileText, Home, Heart, BarChart3, Search, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Estudiantes", href: "/dashboard/students", icon: Users },
  { name: "Fichas Familiares", href: "/dashboard/family-records", icon: FileText },
  { name: "Datos de Vivienda", href: "/dashboard/housing", icon: Home },
  { name: "Datos de Salud", href: "/dashboard/health", icon: Heart },
  { name: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Búsqueda", href: "/dashboard/search", icon: Search },
]

const secondaryNavigation = [{ name: "Configuración", href: "/dashboard/settings", icon: Settings }]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const handleNavigation = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 px-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">Sistema Escolar</h1>
            <p className="text-xs text-gray-600">CPE "Susana Wesley"</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} onClick={handleNavigation}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} onClick={handleNavigation}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
