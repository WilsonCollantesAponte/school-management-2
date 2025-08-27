"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GraduationCap, LayoutDashboard, Users, FileText, Home, Heart, BarChart3, Search, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Sistema Escolar</h1>
              <p className="text-xs text-gray-600">CPE "Susana Wesley"</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Button
                      asChild
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <ul role="list" className="-mx-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <Button
                      asChild
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
