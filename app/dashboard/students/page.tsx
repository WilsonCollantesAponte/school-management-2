import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Users } from "lucide-react"
import { StudentsTable } from "@/components/students/students-table" // Declare the StudentsTable variable

interface SearchParams {
  nivel?: string
  search?: string
  page?: string
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Build query
  let query = supabase
    .from("students")
    .select("id, dni, nombres, apellido_paterno, apellido_materno, edad, nivel, grado, seccion, created_at")
    .order("created_at", { ascending: false })

  // Apply filters
  if (params.nivel) {
    query = query.eq("nivel", params.nivel)
  }

  if (params.search) {
    query = query.or(
      `nombres.ilike.%${params.search}%,apellido_paterno.ilike.%${params.search}%,apellido_materno.ilike.%${params.search}%,dni.ilike.%${params.search}%`,
    )
  }

  const { data: students, error: studentsError } = await query

  if (studentsError) {
    console.error("Error fetching students:", studentsError)
  }

  // Get statistics
  const { data: stats } = await supabase
    .from("students")
    .select("nivel")
    .then(({ data }) => {
      if (!data) return { data: null }
      const counts = data.reduce(
        (acc, student) => {
          acc[student.nivel] = (acc[student.nivel] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
      return { data: counts }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Gestión de Estudiantes</h1>
            <p className="text-gray-600">Administra la información de todos los estudiantes registrados</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/family-records/new">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Estudiante
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inicial</CardTitle>
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.Inicial || 0}</div>
              <p className="text-xs text-muted-foreground">Estudiantes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Primaria</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.Primaria || 0}</div>
              <p className="text-xs text-muted-foreground">Estudiantes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Secundaria</CardTitle>
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.Secundaria || 0}</div>
              <p className="text-xs text-muted-foreground">Estudiantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Estudiantes</CardTitle>
            <CardDescription>
              {params.nivel ? `Mostrando estudiantes de ${params.nivel}` : "Todos los estudiantes registrados"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentsTable students={students || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
