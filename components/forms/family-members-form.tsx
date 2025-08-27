"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { FamilyMember } from "@/lib/types"

interface FamilyMembersFormProps {
  data: Partial<FamilyMember>[]
  onChange: (data: Partial<FamilyMember>[]) => void
}

export function FamilyMembersForm({ data, onChange }: FamilyMembersFormProps) {
  const handleChange = (index: number, field: keyof FamilyMember, value: any) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addMember = () => {
    onChange([...data, { numero: data.length + 1 }])
  }

  const removeMember = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    // Renumber the remaining members
    const renumberedData = newData.map((member, i) => ({ ...member, numero: i + 1 }))
    onChange(renumberedData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Miembros de la Familia</CardTitle>
          <CardDescription>
            Registra a todas las personas que viven en el hogar (incluyendo al estudiante)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.map((member, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Miembro #{member.numero || index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`parentesco_${index}`}>Parentesco</Label>
                    <Input
                      id={`parentesco_${index}`}
                      value={member.parentesco || ""}
                      onChange={(e) => handleChange(index, "parentesco", e.target.value)}
                      placeholder="Padre, Madre, Hijo, Hermano, etc."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`apellidos_nombres_${index}`}>Apellidos y Nombres</Label>
                    <Input
                      id={`apellidos_nombres_${index}`}
                      value={member.apellidos_nombres || ""}
                      onChange={(e) => handleChange(index, "apellidos_nombres", e.target.value)}
                      placeholder="García López, Juan Carlos"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`edad_${index}`}>Edad</Label>
                    <Input
                      id={`edad_${index}`}
                      type="number"
                      value={member.edad || ""}
                      onChange={(e) => handleChange(index, "edad", Number.parseInt(e.target.value) || undefined)}
                      placeholder="25"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`grado_nivel_estudios_${index}`}>Grado/Nivel de Estudios</Label>
                    <Input
                      id={`grado_nivel_estudios_${index}`}
                      value={member.grado_nivel_estudios || ""}
                      onChange={(e) => handleChange(index, "grado_nivel_estudios", e.target.value)}
                      placeholder="Secundaria, Superior, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`ie_empresa_${index}`}>I.E. - Empresa donde Estudia/Trabaja</Label>
                    <Input
                      id={`ie_empresa_${index}`}
                      value={member.ie_empresa || ""}
                      onChange={(e) => handleChange(index, "ie_empresa", e.target.value)}
                      placeholder="Nombre de institución o empresa"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" onClick={addMember} variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Miembro de la Familia
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
