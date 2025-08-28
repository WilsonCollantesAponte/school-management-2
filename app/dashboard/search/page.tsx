import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdvancedSearch } from "@/components/search/advanced-search"

interface SearchParams {
  q?: string
  nivel?: string
  grado?: string
  edad_min?: string
  edad_max?: string
  tipo_seguro?: string
  tipo_ie?: string
  condicion_vivienda?: string
  page?: string
}

export default async function SearchPage({
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

  // Build complex search query
  let studentsQuery = supabase
    .from("students")
    .select(`
      id, dni, nombres, apellido_paterno, apellido_materno, edad, nivel, grado, seccion, 
      tipo_seguro, tipo_ie, domicilio, created_at,
      parents(nombres, apellidos, tipo, celular, email),
      housing(condicion_vivienda, calidad_vivienda, numero_pisos)
    `)
    .order("created_at", { ascending: false })

  // Apply filters
  if (params.q) {
    studentsQuery = studentsQuery.or(
      `nombres.ilike.%${params.q}%,apellido_paterno.ilike.%${params.q}%,apellido_materno.ilike.%${params.q}%,dni.ilike.%${params.q}%,domicilio.ilike.%${params.q}%`,
    )
  }

  if (params.nivel) {
    studentsQuery = studentsQuery.eq("nivel", params.nivel)
  }

  if (params.grado) {
    studentsQuery = studentsQuery.eq("grado", params.grado)
  }

  if (params.edad_min) {
    studentsQuery = studentsQuery.gte("edad", Number.parseInt(params.edad_min))
  }

  if (params.edad_max) {
    studentsQuery = studentsQuery.lte("edad", Number.parseInt(params.edad_max))
  }

  if (params.tipo_seguro) {
    studentsQuery = studentsQuery.eq("tipo_seguro", params.tipo_seguro)
  }

  if (params.tipo_ie) {
    studentsQuery = studentsQuery.eq("tipo_ie", params.tipo_ie)
  }

  const { data: searchResults, error: searchError } = await studentsQuery

  if (searchError) {
    console.error("Search error:", searchError)
  }

  // Filter by housing condition if specified
  let filteredResults = searchResults || []
  if (params.condicion_vivienda && filteredResults.length > 0) {
    filteredResults = filteredResults.filter((student: any) =>
      student.housing?.some((h: any) => h.condicion_vivienda === params.condicion_vivienda),
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Búsqueda Avanzada</h1>
        <p className="text-gray-600">Encuentra estudiantes y familias usando filtros específicos</p>
      </div>

      <AdvancedSearch initialResults={filteredResults} initialParams={params} />
    </div>
  )
}
