"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { FamilyHealth, StudentHealth } from "@/lib/types"

interface HealthInfoFormProps {
  familyHealthData: Partial<FamilyHealth>[]
  studentHealthData: Partial<StudentHealth>[]
  onFamilyHealthChange: (data: Partial<FamilyHealth>[]) => void
  onStudentHealthChange: (data: Partial<StudentHealth>[]) => void
}

export function HealthInfoForm({
  familyHealthData,
  studentHealthData,
  onFamilyHealthChange,
  onStudentHealthChange,
}: HealthInfoFormProps) {
  const handleFamilyHealthChange = (index: number, field: keyof FamilyHealth, value: any) => {
    const newData = [...familyHealthData]
    newData[index] = { ...newData[index], [field]: value }
    onFamilyHealthChange(newData)
  }

  const handleStudentHealthChange = (index: number, field: keyof StudentHealth, value: any) => {
    const newData = [...studentHealthData]
    newData[index] = { ...newData[index], [field]: value }
    onStudentHealthChange(newData)
  }

  const addFamilyHealth = () => {
    onFamilyHealthChange([...familyHealthData, {}])
  }

  const removeFamilyHealth = (index: number) => {
    const newData = familyHealthData.filter((_, i) => i !== index)
    onFamilyHealthChange(newData)
  }

  const addStudentHealth = () => {
    onStudentHealthChange([...studentHealthData, {}])
  }

  const removeStudentHealth = (index: number) => {
    const newData = studentHealthData.filter((_, i) => i !== index)
    onStudentHealthChange(newData)
  }

  return (
    <div className="space-y-8">
      {/* Family Health Records */}
      <Card>
        <CardHeader>
          <CardTitle>Miembros de la Familia Afectados por Alguna Enfermedad/Trastorno/Padecimiento</CardTitle>
          <CardDescription>Registra información médica de los miembros de la familia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {familyHealthData.map((health, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Registro #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyHealth(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`family_nombres_${index}`}>Nombres y Apellidos</Label>
                    <Input
                      id={`family_nombres_${index}`}
                      value={health.nombres_apellidos || ""}
                      onChange={(e) => handleFamilyHealthChange(index, "nombres_apellidos", e.target.value)}
                      placeholder="Nombre completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`family_edad_${index}`}>Edad</Label>
                    <Input
                      id={`family_edad_${index}`}
                      type="number"
                      value={health.edad || ""}
                      onChange={(e) =>
                        handleFamilyHealthChange(index, "edad", Number.parseInt(e.target.value) || undefined)
                      }
                      placeholder="35"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`family_parentesco_${index}`}>Parentesco</Label>
                    <Input
                      id={`family_parentesco_${index}`}
                      value={health.parentesco || ""}
                      onChange={(e) => handleFamilyHealthChange(index, "parentesco", e.target.value)}
                      placeholder="Padre, Madre, Hermano, etc."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`family_enfermedad_${index}`}>Enfermedad</Label>
                    <Textarea
                      id={`family_enfermedad_${index}`}
                      value={health.enfermedad || ""}
                      onChange={(e) => handleFamilyHealthChange(index, "enfermedad", e.target.value)}
                      placeholder="Descripción de la enfermedad o padecimiento"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`family_situacion_${index}`}>Situación Actual</Label>
                    <Input
                      id={`family_situacion_${index}`}
                      value={health.situacion_actual || ""}
                      onChange={(e) => handleFamilyHealthChange(index, "situacion_actual", e.target.value)}
                      placeholder="En tratamiento, controlado, etc."
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" onClick={addFamilyHealth} variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Registro de Salud Familiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Health Records */}
      <Card>
        <CardHeader>
          <CardTitle>Enfermedades/Trastornos/Padecimientos en el Alumno o Alumna</CardTitle>
          <CardDescription>Registra información médica específica del estudiante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {studentHealthData.map((health, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Registro #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStudentHealth(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`student_enfermedad_${index}`}>Enfermedad/Trastorno/Padecimiento</Label>
                    <Textarea
                      id={`student_enfermedad_${index}`}
                      value={health.enfermedad_transtorno || ""}
                      onChange={(e) => handleStudentHealthChange(index, "enfermedad_transtorno", e.target.value)}
                      placeholder="Descripción detallada"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`student_fecha_${index}`}>Fecha de Padecimiento</Label>
                    <Input
                      id={`student_fecha_${index}`}
                      type="date"
                      value={health.fecha_padecimiento || ""}
                      onChange={(e) => handleStudentHealthChange(index, "fecha_padecimiento", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`student_situacion_${index}`}>Situación Actual</Label>
                    <Textarea
                      id={`student_situacion_${index}`}
                      value={health.situacion_actual || ""}
                      onChange={(e) => handleStudentHealthChange(index, "situacion_actual", e.target.value)}
                      placeholder="Estado actual del padecimiento"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" onClick={addStudentHealth} variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Registro de Salud del Estudiante
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
