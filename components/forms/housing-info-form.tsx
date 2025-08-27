"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Housing } from "@/lib/types"

interface HousingInfoFormProps {
  data: Partial<Housing>
  onChange: (data: Partial<Housing>) => void
}

export function HousingInfoForm({ data, onChange }: HousingInfoFormProps) {
  const handleChange = (field: keyof Housing, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Condición de la Vivienda</CardTitle>
          <CardDescription>Información sobre la propiedad y características del hogar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Condición de la Vivienda</Label>
            <RadioGroup
              value={data.condicion_vivienda || ""}
              onValueChange={(value) => handleChange("condicion_vivienda", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PROPIA" id="propia" />
                <Label htmlFor="propia">Propia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALQUILADA" id="alquilada" />
                <Label htmlFor="alquilada">Alquilada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DE POSADA EN CASA DE PADRES U OTRO FAMILIAR" id="posada" />
                <Label htmlFor="posada">De posada en casa de padres u otro familiar</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Calidad de la Vivienda</Label>
            <RadioGroup
              value={data.calidad_vivienda || ""}
              onValueChange={(value) => handleChange("calidad_vivienda", value)}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MAT. RUSTICO" id="rustico" />
                <Label htmlFor="rustico">Material Rústico</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MAT. NOBLE" id="noble" />
                <Label htmlFor="noble">Material Noble</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Número de Pisos</Label>
            <RadioGroup
              value={data.numero_pisos || ""}
              onValueChange={(value) => handleChange("numero_pisos", value)}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1 PISO" id="un_piso" />
                <Label htmlFor="un_piso">1 Piso</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2 PISOS" id="dos_pisos" />
                <Label htmlFor="dos_pisos">2 Pisos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3 o MAS PISOS" id="tres_pisos" />
                <Label htmlFor="tres_pisos">3 o más Pisos</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
