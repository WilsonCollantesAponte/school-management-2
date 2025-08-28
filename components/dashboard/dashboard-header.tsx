"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, LogOut, Settings, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface DashboardHeaderProps {
  user: SupabaseUser
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [globalSearch, setGlobalSearch] = useState("")
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    setIsLoading(false)
  }

  const handleGlobalSearch = () => {
    if (globalSearch.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(globalSearch.trim())}`)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar estudiantes..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGlobalSearch()}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getInitials(user.user_metadata?.full_name || user.email || "U")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "Usuario"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
