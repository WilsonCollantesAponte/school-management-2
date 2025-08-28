import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Heart, Shield, Activity, Plus, AlertTriangle } from "lucide-react"

export default async function HealthPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get students with health-related information
  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select(`
      id, dni, nombres, apellido_paterno, apellido_materno, nivel, grado,
      tipo_seguro,
      student_health(*)
    `)
    .order("apellido_paterno", { ascending: true })

  if (studentsError) {
    console.error("Error fetching health data:", studentsError)
  }

  // Calculate health statistics
  const totalStudents = students?.length || 0
  const withInsurance = students?.filter((s) => s.tipo_seguro && s.tipo_seguro !== "Ninguno").length || 0
  const withHealthRecords = students?.filter((s) => s.student_health && s.student_health.length > 0).length || 0

  const insuranceStats =
    students?.reduce((acc: any, student: any) => {
      const insurance = student.tipo_seguro || "No especificado"
      acc[insurance] = (acc[insurance] || 0) + 1
      return acc
    }, {}) || {}

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Datos de Salud</h1>
            <p className="text-gray-600">Información médica y de seguros de los estudiantes</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/family-records/new">
              <Plus className="h-4 w-4 mr-2" />
              Registrar Datos
            </Link>
          </Button>
        </div>
      </div>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registros de salud</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Seguro</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{withInsurance}</div>
            <p className="text-xs text-muted-foreground">
              {totalStudents > 0 ? Math.round((withInsurance / totalStudents) * 100) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Historial Médico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{withHealthRecords}</div>
            <p className="text-xs text-muted-foreground">Con registros médicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sin Seguro</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents - withInsurance}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Seguros</CardTitle>
            <CardDescription>Tipos de seguro médico por estudiante</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(insuranceStats).map(([insurance, count]) => (
                <div key={insurance} className="flex justify-between items-center">
                  <span className="text-sm">{insurance}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{count as number}</Badge>
                    <span className="text-xs text-gray-500">
                      {totalStudents > 0 ? Math.round(((count as number) / totalStudents) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas de Salud</CardTitle>
            <CardDescription>Estudiantes que requieren atención especial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <span className="text-sm font-medium text-red-900">Sin Seguro Médico</span>
                  <p className="text-xs text-red-700">Estudiantes sin cobertura</p>
                </div>
                <Badge variant="destructive">{totalStudents - withInsurance}</Badge>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <span className="text-sm font-medium text-orange-900">Sin Historial Médico</span>
                  <p className="text-xs text-orange-700">Sin registros de salud</p>
                </div>
                <Badge variant="secondary">{totalStudents - withHealthRecords}</Badge>
              </div>

              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <span className="text-sm font-medium text-yellow-900">Seguimiento Requerido</span>
                  <p className="text-xs text-yellow-700">Estudiantes con condiciones médicas</p>
                </div>
                <Badge variant="outline">{withHealthRecords}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Health Records */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Salud</CardTitle>
          <CardDescription>Información médica de todos los estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          {students && students.length > 0 ? (
            <div className="space-y-4">
              {students.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">
                        {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                      </h3>
                      <Badge variant="secondary">
                        {student.nivel} - {student.grado}
                      </Badge>
                      {student.student_health && student.student_health.length > 0 && (
                        <Badge variant="outline">
                          <Heart className="h-3 w-3 mr-1" />
                          Con Historial
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <span>Seguro: {student.tipo_seguro || "No especificado"}</span>
                      <span>DNI: {student.dni}</span>
                      <span>Registros médicos: {student.student_health?.length || 0}</span>
                    </div>
                    {student.student_health && student.student_health.length > 0 && (
                      <div className="mt-2 text-sm text-blue-600">
                        Última condición: {student.student_health[0].enfermedad_transtorno || "No especificada"}
                      </div>
                    )}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/dashboard/students/${student.id}`}>Ver Detalles</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de salud</h3>
              <p className="text-gray-600 mb-4">Los datos de salud se registran junto con las fichas familiares</p>
              <Button asChild>
                <Link href="/dashboard/family-records/new">Registrar Primeros Datos</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
