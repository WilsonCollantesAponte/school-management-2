import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, User, School, Database, Shield, Bell } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra las configuraciones del sistema y tu perfil</p>
      </div>

      <div className="space-y-6">
        {/* User Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Perfil de Usuario</CardTitle>
            </div>
            <CardDescription>Actualiza tu información personal y preferencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" defaultValue={user.user_metadata?.full_name || ""} placeholder="Tu nombre completo" />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue={user.email || ""} disabled />
              </div>
            </div>
            <div>
              <Label htmlFor="role">Rol en el Sistema</Label>
              <Input id="role" defaultValue="Administrador" disabled />
            </div>
            <Button>Actualizar Perfil</Button>
          </CardContent>
        </Card>

        {/* School Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <School className="h-5 w-5" />
              <CardTitle>Configuración Escolar</CardTitle>
            </div>
            <CardDescription>Información de la institución educativa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="school-name">Nombre de la Institución</Label>
                <Input id="school-name" defaultValue='I.E. CPE "Susana Wesley"' />
              </div>
              <div>
                <Label htmlFor="school-code">Código Modular</Label>
                <Input id="school-code" placeholder="Código MINEDU" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="director">Director(a)</Label>
                <Input id="director" placeholder="Nombre del director" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="Teléfono de contacto" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" placeholder="Dirección completa de la institución" />
            </div>
            <Button>Guardar Configuración</Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Configuración del Sistema</CardTitle>
            </div>
            <CardDescription>Preferencias generales del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo</p>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Activado
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Respaldo Automático</Label>
                <p className="text-sm text-gray-600">Crear respaldos automáticos de la base de datos</p>
              </div>
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Seguridad</Label>
                <p className="text-sm text-gray-600">Configurar políticas de seguridad y acceso</p>
              </div>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Administrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Academic Year Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Año Académico</CardTitle>
            <CardDescription>Configuración del período escolar actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="academic-year">Año Académico</Label>
                <Input id="academic-year" defaultValue="2024" />
              </div>
              <div>
                <Label htmlFor="start-date">Fecha de Inicio</Label>
                <Input id="start-date" type="date" defaultValue="2024-03-01" />
              </div>
              <div>
                <Label htmlFor="end-date">Fecha de Fin</Label>
                <Input id="end-date" type="date" defaultValue="2024-12-20" />
              </div>
            </div>
            <Button>Actualizar Año Académico</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
            <CardDescription>Acciones irreversibles del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <Label className="text-red-900">Exportar Datos</Label>
                <p className="text-sm text-red-700">Descargar todos los datos del sistema</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Exportar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <Label className="text-red-900">Restablecer Sistema</Label>
                <p className="text-sm text-red-700">Eliminar todos los datos (irreversible)</p>
              </div>
              <Button variant="destructive" size="sm">
                Restablecer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
