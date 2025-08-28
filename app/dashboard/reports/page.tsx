import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Users, Download, TrendingUp } from "lucide-react"

export default async function ReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get basic statistics for reports
  const { data: students } = await supabase.from("students").select("nivel, edad, tipo_seguro, created_at")

  const stats = {
    total: students?.length || 0,
    byLevel:
      students?.reduce(
        (acc, student) => {
          acc[student.nivel] = (acc[student.nivel] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {},
    byInsurance:
      students?.reduce(
        (acc, student) => {
          const insurance = student.tipo_seguro || "No especificado"
          acc[insurance] = (acc[insurance] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {},
    thisMonth:
      students?.filter((s) => {
        const created = new Date(s.created_at)
        const now = new Date()
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
      }).length || 0,
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes y Estadísticas</h1>
        <p className="text-gray-600">Análisis y reportes del sistema de gestión escolar</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Registrados en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Este Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
            <p className="text-xs text-muted-foreground">Registros recientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nivel Primaria</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byLevel.Primaria || 0}</div>
            <p className="text-xs text-muted-foreground">Estudiantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con SIS</CardTitle>
            <div className="h-2 w-2 bg-blue-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byInsurance.SIS || 0}</div>
            <p className="text-xs text-muted-foreground">Estudiantes</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Reporte por Niveles</CardTitle>
                <CardDescription>Distribución de estudiantes por nivel educativo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Inicial</span>
                <span className="font-medium">{stats.byLevel.Inicial || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Primaria</span>
                <span className="font-medium">{stats.byLevel.Primaria || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Secundaria</span>
                <span className="font-medium">{stats.byLevel.Secundaria || 0}</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Reporte de Seguros</CardTitle>
                <CardDescription>Distribución por tipo de seguro médico</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byInsurance).map(([insurance, count]) => (
                <div key={insurance} className="flex justify-between items-center">
                  <span className="text-sm">{insurance}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Reporte Familiar</CardTitle>
                <CardDescription>Información de familias y apoderados</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Genera reportes detallados sobre la información familiar, datos socioeconómicos y de vivienda.
            </p>
            <Button className="w-full bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
