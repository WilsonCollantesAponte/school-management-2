"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

interface Student {
  id: string
  dni?: string
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  edad?: number
  nivel: "Inicial" | "Primaria" | "Secundaria"
  grado?: string
  seccion?: string
  created_at: string
}

interface StudentsTableProps {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const router = useRouter()
  const searchParams = useSearchParams()

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellido_materno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dni?.includes(searchTerm)

    const matchesLevel = levelFilter === "all" || student.nivel === levelFilter

    return matchesSearch && matchesLevel
  })

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }
    if (levelFilter !== "all") {
      params.set("nivel", levelFilter)
    } else {
      params.delete("nivel")
    }
    router.push(`/dashboard/students?${params.toString()}`)
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

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, apellido o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los niveles</SelectItem>
            <SelectItem value="Inicial">Inicial</SelectItem>
            <SelectItem value="Primaria">Primaria</SelectItem>
            <SelectItem value="Secundaria">Secundaria</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredStudents.length} de {students.length} estudiantes
      </div>

      {/* Students Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Grado/Sección</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No se encontraron estudiantes
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                      </div>
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
                  <TableCell>{new Date(student.created_at).toLocaleDateString("es-PE")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/students/${student.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/students/${student.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
