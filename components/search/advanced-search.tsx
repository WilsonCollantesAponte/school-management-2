"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, Users, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchResult {
  id: string
  dni?: string
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  edad?: number
  nivel: string
  grado?: string
  seccion?: string
  tipo_seguro?: string
  tipo_ie?: string
  domicilio?: string
  created_at: string
  parents?: Array<{
    nombres?: string
    apellidos?: string
    tipo: string
    celular?: string
    email?: string
  }>
  housing?: Array<{
    condicion_vivienda?: string
    calidad_vivienda?: string
    numero_pisos?: string
  }>
}

interface AdvancedSearchProps {
  initialResults: SearchResult[]
  initialParams: any
}

export function AdvancedSearch({ initialResults, initialParams }: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialParams.q || "")
  const [filters, setFilters] = useState({
    nivel: initialParams.nivel || "all",
    grado: initialParams.grado || "",
    edad_min: initialParams.edad_min || "",
    edad_max: initialParams.edad_max || "",
    tipo_seguro: initialParams.tipo_seguro || "all",
    tipo_ie: initialParams.tipo_ie || "all",
    condicion_vivienda: initialParams.condicion_vivienda || "all",
  })
  const [results, setResults] = useState<SearchResult[]>(initialResults)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("results")

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = () => {
    setIsLoading(true)
    const params = new URLSearchParams()

    if (searchTerm) params.set("q", searchTerm)
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") params.set(key, value)
    })

    router.push(`/dashboard/search?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilters({
      nivel: "all",
      grado: "",
      edad_min: "",
      edad_max: "",
      tipo_seguro: "all",
      tipo_ie: "all",
      condicion_vivienda: "all",
    })
    router.push("/dashboard/search")
  }

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case "Inicial":
        return "bg-blue-100 text-blue-800"
      case "Primaria":
        return "bg-green-100 text-green-800"
      case "Secundaria":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportResults = () => {
    const csvContent = [
      ["Nombres", "Apellidos", "DNI", "Edad", "Nivel", "Grado", "Sección", "Domicilio"].join(","),
      ...results.map((student) =>
        [
          student.nombres,
          `${student.apellido_paterno} ${student.apellido_materno}`,
          student.dni || "",
          student.edad || "",
          student.nivel,
          student.grado || "",
          student.seccion || "",
          student.domicilio || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `estudiantes_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Statistics
  const stats = {
    total: results.length,
    inicial: results.filter((s) => s.nivel === "Inicial").length,
    primaria: results.filter((s) => s.nivel === "Primaria").length,
    secundaria: results.filter((s) => s.nivel === "Secundaria").length,
    withSIS: results.filter((s) => s.tipo_seguro === "SIS").length,
    withESSALUD: results.filter((s) => s.tipo_seguro === "ESSALUD").length,
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Criterios de Búsqueda
          </CardTitle>
          <CardDescription>Utiliza los filtros para encontrar estudiantes específicos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Búsqueda General</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="Buscar por nombre, apellido, DNI o domicilio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Nivel Educativo</Label>
              <Select value={filters.nivel} onValueChange={(value) => setFilters({ ...filters, nivel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los niveles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="Inicial">Inicial</SelectItem>
                  <SelectItem value="Primaria">Primaria</SelectItem>
                  <SelectItem value="Secundaria">Secundaria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grado</Label>
              <Input
                placeholder="1°, 2°, 3°..."
                value={filters.grado}
                onChange={(e) => setFilters({ ...filters, grado: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Edad Mínima</Label>
              <Input
                type="number"
                placeholder="3"
                value={filters.edad_min}
                onChange={(e) => setFilters({ ...filters, edad_min: e.target.value })}
                min="3"
                max="18"
              />
            </div>

            <div className="space-y-2">
              <Label>Edad Máxima</Label>
              <Input
                type="number"
                placeholder="18"
                value={filters.edad_max}
                onChange={(e) => setFilters({ ...filters, edad_max: e.target.value })}
                min="3"
                max="18"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Seguro</Label>
              <Select
                value={filters.tipo_seguro}
                onValueChange={(value) => setFilters({ ...filters, tipo_seguro: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los seguros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los seguros</SelectItem>
                  <SelectItem value="SIS">SIS</SelectItem>
                  <SelectItem value="ESSALUD">EsSalud</SelectItem>
                  <SelectItem value="PARTICULAR">Particular</SelectItem>
                  <SelectItem value="NO TIENE">No Tiene</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de I.E. Anterior</Label>
              <Select value={filters.tipo_ie} onValueChange={(value) => setFilters({ ...filters, tipo_ie: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="ESTATAL">Estatal</SelectItem>
                  <SelectItem value="PARTICULAR">Particular</SelectItem>
                  <SelectItem value="PARROQUIAL">Parroquial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Condición de Vivienda</Label>
              <Select
                value={filters.condicion_vivienda}
                onValueChange={(value) => setFilters({ ...filters, condicion_vivienda: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas las condiciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las condiciones</SelectItem>
                  <SelectItem value="PROPIA">Propia</SelectItem>
                  <SelectItem value="ALQUILADA">Alquilada</SelectItem>
                  <SelectItem value="DE POSADA EN CASA DE PADRES U OTRO FAMILIAR">De Posada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </Button>
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="results">Resultados ({results.length})</TabsTrigger>
            <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
          </TabsList>
          {results.length > 0 && (
            <Button onClick={exportResults} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          )}
        </div>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Búsqueda</CardTitle>
              <CardDescription>
                {results.length === 0
                  ? "No se encontraron estudiantes con los criterios especificados"
                  : `Se encontraron ${results.length} estudiante${results.length !== 1 ? "s" : ""}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No se encontraron resultados</p>
                  <Button onClick={clearFilters} variant="outline">
                    Limpiar filtros y ver todos
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Estudiante</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Edad</TableHead>
                        <TableHead>Nivel</TableHead>
                        <TableHead>Grado/Sección</TableHead>
                        <TableHead>Seguro</TableHead>
                        <TableHead>Domicilio</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="font-medium">
                              {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                            </div>
                          </TableCell>
                          <TableCell>{student.dni || "No registrado"}</TableCell>
                          <TableCell>{student.edad ? `${student.edad} años` : "No registrado"}</TableCell>
                          <TableCell>
                            <Badge className={getLevelColor(student.nivel)}>{student.nivel}</Badge>
                          </TableCell>
                          <TableCell>
                            {student.grado && student.seccion
                              ? `${student.grado} - ${student.seccion}`
                              : student.grado || "No registrado"}
                          </TableCell>
                          <TableCell>{student.tipo_seguro || "No registrado"}</TableCell>
                          <TableCell className="max-w-xs truncate">{student.domicilio || "No registrado"}</TableCell>
                          <TableCell className="text-right">
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/dashboard/students/${student.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Estudiantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">En los resultados de búsqueda</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel Inicial</CardTitle>
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inicial}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.inicial / stats.total) * 100) : 0}% del total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel Primaria</CardTitle>
                <div className="h-2 w-2 bg-green-500 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.primaria}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.primaria / stats.total) * 100) : 0}% del total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel Secundaria</CardTitle>
                <div className="h-2 w-2 bg-purple-500 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.secundaria}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.secundaria / stats.total) * 100) : 0}% del total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Con SIS</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withSIS}</div>
                <p className="text-xs text-muted-foreground">Estudiantes con seguro SIS</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Con EsSalud</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withESSALUD}</div>
                <p className="text-xs text-muted-foreground">Estudiantes con EsSalud</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
