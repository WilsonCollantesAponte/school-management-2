import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, FileText, Users, Eye } from "lucide-react"

export default async function FamilyRecordsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get students with their family information
  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select(`
      id, dni, nombres, apellido_paterno, apellido_materno, nivel, grado, created_at,
      parents(nombres, apellidos, tipo, celular),
      housing(condicion_vivienda, calidad_vivienda)
    `)
    .order("created_at", { ascending: false })

  if (studentsError) {
    console.error("Error fetching family records:", studentsError)
  }

  const totalRecords = students?.length || 0
  const completedRecords =
    students?.filter(
      (student) => student.parents && student.parents.length > 0 && student.housing && student.housing.length > 0,
    ).length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Fichas Familiares</h1>
            <p className="text-gray-600">Gestión de información familiar y socioeconómica</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/family-records/new">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Ficha
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fichas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords}</div>
              <p className="text-xs text-muted-foreground">Fichas registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fichas Completas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedRecords}</div>
              <p className="text-xs text-muted-foreground">Con información completa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <div className="h-2 w-2 bg-orange-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords - completedRecords}</div>
              <p className="text-xs text-muted-foreground">Por completar</p>
            </CardContent>
          </Card>
        </div>

        {/* Family Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Fichas Familiares</CardTitle>
            <CardDescription>Información familiar de todos los estudiantes registrados</CardDescription>
          </CardHeader>
          <CardContent>
            {students && students.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="space-y-4 min-w-[600px] md:min-w-0">
                  {students.map((student: any) => {
                    const hasParents = student.parents && student.parents.length > 0
                    const hasHousing = student.housing && student.housing.length > 0
                    const isComplete = hasParents && hasHousing

                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-medium text-balance">
                              {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                            </h3>
                            <Badge variant={isComplete ? "default" : "secondary"} className="shrink-0">
                              {isComplete ? "Completa" : "Incompleta"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                            <span className="shrink-0">DNI: {student.dni}</span>
                            <span className="shrink-0">
                              {student.nivel} - {student.grado}
                            </span>
                            <span className="shrink-0">Padres: {student.parents?.length || 0}</span>
                            <span className="shrink-0">Vivienda: {hasHousing ? "Sí" : "No"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4 shrink-0">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/students/${student.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/students/${student.id}/edit`}>Editar</Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fichas familiares</h3>
                <p className="text-gray-600 mb-4">Comienza creando la primera ficha familiar</p>
                <Button asChild>
                  <Link href="/dashboard/family-records/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primera Ficha
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
