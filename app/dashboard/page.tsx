import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, FileText, Plus, Search, BarChart3, GraduationCap, UserPlus, ClipboardList } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get basic statistics
  const { data: studentsCount } = await supabase.from("students").select("id", { count: "exact", head: true })

  const { data: recentStudents } = await supabase
    .from("students")
    .select("id, nombres, apellido_paterno, apellido_materno, nivel, grado, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader user={user} />
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido, {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="text-gray-600">Sistema de Gestión Escolar - I.E. CPE "Susana Wesley"</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentsCount?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Registrados en el sistema</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fichas Familiares</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentsCount?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Fichas completadas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel Inicial</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reportes</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Generados este mes</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Acciones Rápidas
                </CardTitle>
                <CardDescription>Accede rápidamente a las funciones principales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/students/new">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Registrar Nuevo Estudiante
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/family-records/new">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Crear Ficha Familiar
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/students">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar Estudiantes
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/reports">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generar Reportes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estudiantes Recientes</CardTitle>
                <CardDescription>Últimos estudiantes registrados en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {recentStudents && recentStudents.length > 0 ? (
                  <div className="space-y-3">
                    {recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">
                            {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {student.nivel}
                            </Badge>
                            {student.grado && (
                              <Badge variant="outline" className="text-xs">
                                {student.grado}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/dashboard/students/${student.id}`}>Ver</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No hay estudiantes registrados aún</p>
                    <Button asChild className="mt-4" size="sm">
                      <Link href="/dashboard/students/new">Registrar Primer Estudiante</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Levels Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen por Niveles Educativos</CardTitle>
              <CardDescription>Distribución de estudiantes por nivel académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-900">Inicial</h3>
                    <Badge className="bg-blue-100 text-blue-800">0 estudiantes</Badge>
                  </div>
                  <p className="text-sm text-blue-700">Edades: 3-5 años</p>
                  <Button asChild size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                    <Link href="/dashboard/students?nivel=Inicial">Ver Estudiantes</Link>
                  </Button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-900">Primaria</h3>
                    <Badge className="bg-green-100 text-green-800">0 estudiantes</Badge>
                  </div>
                  <p className="text-sm text-green-700">Grados: 1° - 6°</p>
                  <Button asChild size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                    <Link href="/dashboard/students?nivel=Primaria">Ver Estudiantes</Link>
                  </Button>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-900">Secundaria</h3>
                    <Badge className="bg-purple-100 text-purple-800">0 estudiantes</Badge>
                  </div>
                  <p className="text-sm text-purple-700">Grados: 1° - 5°</p>
                  <Button asChild size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                    <Link href="/dashboard/students?nivel=Secundaria">Ver Estudiantes</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
