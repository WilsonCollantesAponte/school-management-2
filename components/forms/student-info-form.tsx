"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Student } from "@/lib/types"

interface StudentInfoFormProps {
  data: Partial<Student>
  onChange: (data: Partial<Student>) => void
}

export function StudentInfoForm({ data, onChange }: StudentInfoFormProps) {
  const handleChange = (field: keyof Student, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="dni">DNI</Label>
        <Input
          id="dni"
          value={data.dni || ""}
          onChange={(e) => handleChange("dni", e.target.value)}
          placeholder="12345678"
          maxLength={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edad">Edad</Label>
        <Input
          id="edad"
          type="number"
          value={data.edad || ""}
          onChange={(e) => handleChange("edad", Number.parseInt(e.target.value) || undefined)}
          placeholder="5"
          min="3"
          max="18"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apellido_paterno">Apellido Paterno *</Label>
        <Input
          id="apellido_paterno"
          value={data.apellido_paterno || ""}
          onChange={(e) => handleChange("apellido_paterno", e.target.value)}
          placeholder="García"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apellido_materno">Apellido Materno *</Label>
        <Input
          id="apellido_materno"
          value={data.apellido_materno || ""}
          onChange={(e) => handleChange("apellido_materno", e.target.value)}
          placeholder="López"
          required
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="nombres">Nombres *</Label>
        <Input
          id="nombres"
          value={data.nombres || ""}
          onChange={(e) => handleChange("nombres", e.target.value)}
          placeholder="Juan Carlos"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nivel">Nivel Educativo *</Label>
        <Select value={data.nivel || ""} onValueChange={(value) => handleChange("nivel", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inicial">Inicial</SelectItem>
            <SelectItem value="Primaria">Primaria</SelectItem>
            <SelectItem value="Secundaria">Secundaria</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grado">Grado</Label>
        <Input
          id="grado"
          value={data.grado || ""}
          onChange={(e) => handleChange("grado", e.target.value)}
          placeholder="1°, 2°, 3°..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seccion">Sección</Label>
        <Input
          id="seccion"
          value={data.seccion || ""}
          onChange={(e) => handleChange("seccion", e.target.value)}
          placeholder="A, B, C..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
        <Input
          id="fecha_nacimiento"
          type="date"
          value={data.fecha_nacimiento || ""}
          onChange={(e) => handleChange("fecha_nacimiento", e.target.value)}
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="lugar_nacimiento">Lugar de Nacimiento</Label>
        <Input
          id="lugar_nacimiento"
          value={data.lugar_nacimiento || ""}
          onChange={(e) => handleChange("lugar_nacimiento", e.target.value)}
          placeholder="Lima, Perú"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="domicilio">Domicilio</Label>
        <Textarea
          id="domicilio"
          value={data.domicilio || ""}
          onChange={(e) => handleChange("domicilio", e.target.value)}
          placeholder="Av. Principal 123, Distrito, Provincia"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ie_procedencia">I.E. de Procedencia</Label>
        <Input
          id="ie_procedencia"
          value={data.ie_procedencia || ""}
          onChange={(e) => handleChange("ie_procedencia", e.target.value)}
          placeholder="Nombre de la institución anterior"
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo de I.E. de Procedencia</Label>
        <RadioGroup
          value={data.tipo_ie || ""}
          onValueChange={(value) => handleChange("tipo_ie", value)}
          className="flex flex-row space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ESTATAL" id="estatal" />
            <Label htmlFor="estatal">Estatal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PARTICULAR" id="particular" />
            <Label htmlFor="particular">Particular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PARROQUIAL" id="parroquial" />
            <Label htmlFor="parroquial">Parroquial</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="codigo_modular">Código Modular</Label>
        <Input
          id="codigo_modular"
          value={data.codigo_modular || ""}
          onChange={(e) => handleChange("codigo_modular", e.target.value)}
          placeholder="1234567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="codigo_estudiante">Código del Estudiante</Label>
        <Input
          id="codigo_estudiante"
          value={data.codigo_estudiante || ""}
          onChange={(e) => handleChange("codigo_estudiante", e.target.value)}
          placeholder="EST001"
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Seguro Médico</Label>
        <RadioGroup
          value={data.tipo_seguro || ""}
          onValueChange={(value) => handleChange("tipo_seguro", value)}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SIS" id="sis" />
            <Label htmlFor="sis">SIS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ESSALUD" id="essalud" />
            <Label htmlFor="essalud">EsSalud</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PARTICULAR" id="particular_seguro" />
            <Label htmlFor="particular_seguro">Particular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NO TIENE" id="no_tiene" />
            <Label htmlFor="no_tiene">No Tiene</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="contacto_emergencia">Contacto de Emergencia</Label>
        <Input
          id="contacto_emergencia"
          value={data.contacto_emergencia || ""}
          onChange={(e) => handleChange("contacto_emergencia", e.target.value)}
          placeholder="Nombre y teléfono de contacto"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="vive_con">¿Con quién vive el alumno y de quién depende?</Label>
        <Textarea
          id="vive_con"
          value={data.vive_con || ""}
          onChange={(e) => handleChange("vive_con", e.target.value)}
          placeholder="Descripción de con quién vive el estudiante"
          rows={2}
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="apoderado_ie">Nombre del Apoderado ante la I.E. CPE "Susana Wesley"</Label>
        <Input
          id="apoderado_ie"
          value={data.apoderado_ie || ""}
          onChange={(e) => handleChange("apoderado_ie", e.target.value)}
          placeholder="Nombre completo del apoderado"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="personas_en_casa">N° de Personas que Viven en Casa</Label>
        <Input
          id="personas_en_casa"
          type="number"
          value={data.personas_en_casa || ""}
          onChange={(e) => handleChange("personas_en_casa", Number.parseInt(e.target.value) || undefined)}
          placeholder="4"
          min="1"
        />
      </div>
    </div>
  )
}
