import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Home, Building, Users, BarChart3 } from "lucide-react"

export default async function HousingPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get housing data with student information
  const { data: housingData, error: housingError } = await supabase
    .from("housing")
    .select(`
      id, condicion_vivienda, calidad_vivienda, numero_pisos,
      student_id,
      students(nombres, apellido_paterno, apellido_materno, nivel, grado)
    `)
    .order("id", { ascending: false })

  if (housingError) {
    console.error("Error fetching housing data:", housingError)
  }

  // Calculate statistics
  const totalRecords = housingData?.length || 0
  const housingStats = housingData?.reduce(
    (acc: any, housing: any) => {
      const condition = housing.condicion_vivienda || "No especificado"
      const quality = housing.calidad_vivienda || "No especificado"

      acc.byCondition[condition] = (acc.byCondition[condition] || 0) + 1
      acc.byQuality[quality] = (acc.byQuality[quality] || 0) + 1

      return acc
    },
    { byCondition: {}, byQuality: {} },
  ) || { byCondition: {}, byQuality: {} }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Datos de Vivienda</h1>
          <p className="text-gray-600">Información sobre las condiciones habitacionales de las familias</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/family-records/new">
            <Home className="h-4 w-4 mr-2" />
            Registrar Vivienda
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">Viviendas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vivienda Propia</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{housingStats.byCondition["Propia"] || 0}</div>
            <p className="text-xs text-muted-foreground">Familias con casa propia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alquilada</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{housingStats.byCondition["Alquilada"] || 0}</div>
            <p className="text-xs text-muted-foreground">Familias en alquiler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buena Calidad</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{housingStats.byQuality["Buena"] || 0}</div>
            <p className="text-xs text-muted-foreground">Viviendas en buen estado</p>
          </CardContent>
        </Card>
      </div>

      {/* Housing Condition Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Condición de Vivienda</CardTitle>
            <CardDescription>Distribución por tipo de tenencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(housingStats.byCondition).map(([condition, count]) => (
                <div key={condition} className="flex justify-between items-center">
                  <span className="text-sm">{condition}</span>
                  <Badge variant="outline">{count as number}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calidad de Vivienda</CardTitle>
            <CardDescription>Estado de las construcciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(housingStats.byQuality).map(([quality, count]) => (
                <div key={quality} className="flex justify-between items-center">
                  <span className="text-sm">{quality}</span>
                  <Badge variant="outline">{count as number}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Housing Records List */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Vivienda</CardTitle>
          <CardDescription>Información detallada de las viviendas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          {housingData && housingData.length > 0 ? (
            <div className="space-y-4">
              {housingData.map((housing: any) => (
                <div
                  key={housing.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-medium truncate">
                        {housing.students?.nombres} {housing.students?.apellido_paterno}{" "}
                        {housing.students?.apellido_materno}
                      </h3>
                      <Badge variant="secondary" className="w-fit">
                        {housing.students?.nivel} - {housing.students?.grado}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm text-gray-600">
                      <span>Condición: {housing.condicion_vivienda}</span>
                      <span>Calidad: {housing.calidad_vivienda}</span>
                      <span>Pisos: {housing.numero_pisos}</span>
                    </div>
                  </div>
                  <Button asChild size="sm" variant="outline" className="w-full sm:w-auto bg-transparent">
                    <Link href={`/dashboard/students/${housing.student_id}`}>Ver Detalles</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de vivienda</h3>
              <p className="text-gray-600 mb-4">Los datos de vivienda se registran junto con las fichas familiares</p>
              <Button asChild>
                <Link href="/dashboard/family-records/new">Registrar Primera Vivienda</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
