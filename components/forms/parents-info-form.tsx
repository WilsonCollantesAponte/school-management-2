"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Parent } from "@/lib/types"

interface ParentsInfoFormProps {
  data: Partial<Parent>[]
  onChange: (data: Partial<Parent>[]) => void
}

export function ParentsInfoForm({ data, onChange }: ParentsInfoFormProps) {
  const handleChange = (index: number, field: keyof Parent, value: any) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const parentTitles = {
    PAPA: "Datos del Papá",
    MAMA: "Datos de la Mamá",
    APODERADO: "Datos del Apoderado",
  }

  return (
    <div className="space-y-8">
      {data.map((parent, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{parentTitles[parent.tipo as keyof typeof parentTitles]}</CardTitle>
            <CardDescription>Información personal, laboral y de contacto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`apellidos_${index}`}>Apellidos</Label>
                <Input
                  id={`apellidos_${index}`}
                  value={parent.apellidos || ""}
                  onChange={(e) => handleChange(index, "apellidos", e.target.value)}
                  placeholder="García López"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`nombres_${index}`}>Nombres</Label>
                <Input
                  id={`nombres_${index}`}
                  value={parent.nombres || ""}
                  onChange={(e) => handleChange(index, "nombres", e.target.value)}
                  placeholder="Juan Carlos"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`religion_${index}`}>Religión</Label>
                <Input
                  id={`religion_${index}`}
                  value={parent.religion || ""}
                  onChange={(e) => handleChange(index, "religion", e.target.value)}
                  placeholder="Católica, Evangélica, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dni_${index}`}>N° DNI</Label>
                <Input
                  id={`dni_${index}`}
                  value={parent.dni || ""}
                  onChange={(e) => handleChange(index, "dni", e.target.value)}
                  placeholder="12345678"
                  maxLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`edad_${index}`}>Edad</Label>
                <Input
                  id={`edad_${index}`}
                  type="number"
                  value={parent.edad || ""}
                  onChange={(e) => handleChange(index, "edad", Number.parseInt(e.target.value) || undefined)}
                  placeholder="35"
                  min="18"
                  max="80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`fecha_nacimiento_${index}`}>Fecha de Nacimiento</Label>
                <Input
                  id={`fecha_nacimiento_${index}`}
                  type="date"
                  value={parent.fecha_nacimiento || ""}
                  onChange={(e) => handleChange(index, "fecha_nacimiento", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`grado_instruccion_${index}`}>Grado de Instrucción</Label>
                <Input
                  id={`grado_instruccion_${index}`}
                  value={parent.grado_instruccion || ""}
                  onChange={(e) => handleChange(index, "grado_instruccion", e.target.value)}
                  placeholder="Secundaria completa, Superior técnico, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`estado_civil_${index}`}>Estado Civil</Label>
                <Input
                  id={`estado_civil_${index}`}
                  value={parent.estado_civil || ""}
                  onChange={(e) => handleChange(index, "estado_civil", e.target.value)}
                  placeholder="Soltero, Casado, Conviviente, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`numero_hijos_${index}`}>N° de Hijos</Label>
                <Input
                  id={`numero_hijos_${index}`}
                  type="number"
                  value={parent.numero_hijos || ""}
                  onChange={(e) => handleChange(index, "numero_hijos", Number.parseInt(e.target.value) || undefined)}
                  placeholder="2"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`oficio_profesion_${index}`}>Oficio o Profesión</Label>
                <Input
                  id={`oficio_profesion_${index}`}
                  value={parent.oficio_profesion || ""}
                  onChange={(e) => handleChange(index, "oficio_profesion", e.target.value)}
                  placeholder="Ingeniero, Comerciante, Ama de casa, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ocupacion_${index}`}>Ocupación</Label>
                <Input
                  id={`ocupacion_${index}`}
                  value={parent.ocupacion || ""}
                  onChange={(e) => handleChange(index, "ocupacion", e.target.value)}
                  placeholder="Descripción de la ocupación actual"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`centro_trabajo_${index}`}>Centro de Trabajo</Label>
                <Input
                  id={`centro_trabajo_${index}`}
                  value={parent.centro_trabajo || ""}
                  onChange={(e) => handleChange(index, "centro_trabajo", e.target.value)}
                  placeholder="Nombre de la empresa o institución"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lugar_trabajo_${index}`}>Lugar de Trabajo</Label>
                <Input
                  id={`lugar_trabajo_${index}`}
                  value={parent.lugar_trabajo || ""}
                  onChange={(e) => handleChange(index, "lugar_trabajo", e.target.value)}
                  placeholder="Distrito, ciudad donde trabaja"
                />
              </div>

              <div className="space-y-2">
                <Label>Situación Laboral</Label>
                <RadioGroup
                  value={parent.situacion_laboral || ""}
                  onValueChange={(value) => handleChange(index, "situacion_laboral", value)}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DEPENDIENTE" id={`dependiente_${index}`} />
                    <Label htmlFor={`dependiente_${index}`}>Dependiente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="INDEPENDIENTE" id={`independiente_${index}`} />
                    <Label htmlFor={`independiente_${index}`}>Independiente</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ingreso_personal_${index}`}>Ingreso Promedio Personal (S/)</Label>
                <Input
                  id={`ingreso_personal_${index}`}
                  type="number"
                  step="0.01"
                  value={parent.ingreso_personal || ""}
                  onChange={(e) =>
                    handleChange(index, "ingreso_personal", Number.parseFloat(e.target.value) || undefined)
                  }
                  placeholder="1500.00"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ingreso_familiar_${index}`}>Ingreso Promedio Familiar (S/)</Label>
                <Input
                  id={`ingreso_familiar_${index}`}
                  type="number"
                  step="0.01"
                  value={parent.ingreso_familiar || ""}
                  onChange={(e) =>
                    handleChange(index, "ingreso_familiar", Number.parseFloat(e.target.value) || undefined)
                  }
                  placeholder="2500.00"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`celular_${index}`}>N° Celular Personal</Label>
                <Input
                  id={`celular_${index}`}
                  value={parent.celular || ""}
                  onChange={(e) => handleChange(index, "celular", e.target.value)}
                  placeholder="987654321"
                  maxLength={9}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email_${index}`}>Correo Electrónico</Label>
                <Input
                  id={`email_${index}`}
                  type="email"
                  value={parent.email || ""}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
