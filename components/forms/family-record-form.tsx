"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StudentInfoForm } from "./student-info-form"
import { ParentsInfoForm } from "./parents-info-form"
import { FamilyMembersForm } from "./family-members-form"
import { HousingInfoForm } from "./housing-info-form"
import { HealthInfoForm } from "./health-info-form"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import type { Student, Parent, FamilyMember, Housing, FamilyHealth, StudentHealth } from "@/lib/types"

interface FamilyRecordFormProps {
  userId?: string
  existingData?: {
    student: Student
    parents: Parent[]
    family_members: FamilyMember[]
    housing: Housing | null
    family_health: FamilyHealth[]
    student_health: StudentHealth[]
  }
  isEditing?: boolean
}

interface FormData {
  student: Partial<Student>
  parents: Partial<Parent>[]
  familyMembers: Partial<FamilyMember>[]
  housing: Partial<Housing>
  familyHealth: Partial<FamilyHealth>[]
  studentHealth: Partial<StudentHealth>[]
}

export function FamilyRecordForm({ userId, existingData, isEditing = false }: FamilyRecordFormProps) {
  const [activeTab, setActiveTab] = useState("student")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>(() => {
    if (isEditing && existingData) {
      return {
        student: existingData.student,
        parents:
          existingData.parents.length > 0
            ? existingData.parents
            : [{ tipo: "PAPA" }, { tipo: "MAMA" }, { tipo: "APODERADO" }],
        familyMembers: existingData.family_members,
        housing: existingData.housing || {},
        familyHealth: existingData.family_health,
        studentHealth: existingData.student_health,
      }
    }
    return {
      student: { user_id: userId },
      parents: [{ tipo: "PAPA" }, { tipo: "MAMA" }, { tipo: "APODERADO" }],
      familyMembers: [],
      housing: {},
      familyHealth: [],
      studentHealth: [],
    }
  })

  const router = useRouter()
  const supabase = createClient()

  const tabs = [
    { id: "student", label: "Estudiante", description: "Información básica del estudiante" },
    { id: "parents", label: "Padres/Apoderado", description: "Datos de padres y apoderado" },
    { id: "family", label: "Familia", description: "Miembros de la familia" },
    { id: "housing", label: "Vivienda", description: "Información de la vivienda" },
    { id: "health", label: "Salud", description: "Datos de salud familiar y del estudiante" },
  ]

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
  const progress = ((currentTabIndex + 1) / tabs.length) * 100

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      let studentId: string

      if (isEditing && existingData) {
        studentId = existingData.student.id
        const { error: studentError } = await supabase.from("students").update(formData.student).eq("id", studentId)

        if (studentError) throw studentError

        await Promise.all([
          supabase.from("parents").delete().eq("student_id", studentId),
          supabase.from("family_members").delete().eq("student_id", studentId),
          supabase.from("housing").delete().eq("student_id", studentId),
          supabase.from("family_health").delete().eq("student_id", studentId),
          supabase.from("student_health").delete().eq("student_id", studentId),
        ])
      } else {
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .insert([formData.student])
          .select()
          .single()

        if (studentError) throw studentError
        studentId = studentData.id
      }

      const parentsToInsert = formData.parents
        .filter((parent) => parent.nombres || parent.apellidos)
        .map((parent) => ({
          ...parent,
          student_id: studentId,
        }))

      if (parentsToInsert.length > 0) {
        const { error: parentsError } = await supabase.from("parents").insert(parentsToInsert)
        if (parentsError) throw parentsError
      }

      const familyMembersToInsert = formData.familyMembers
        .filter((member) => member.apellidos_nombres)
        .map((member) => ({
          ...member,
          student_id: studentId,
        }))

      if (familyMembersToInsert.length > 0) {
        const { error: familyError } = await supabase.from("family_members").insert(familyMembersToInsert)
        if (familyError) throw familyError
      }

      if (Object.keys(formData.housing).length > 0) {
        const { error: housingError } = await supabase.from("housing").insert([
          {
            ...formData.housing,
            student_id: studentId,
          },
        ])
        if (housingError) throw housingError
      }

      const familyHealthToInsert = formData.familyHealth
        .filter((health) => health.nombres_apellidos || health.enfermedad)
        .map((health) => ({
          ...health,
          student_id: studentId,
        }))

      if (familyHealthToInsert.length > 0) {
        const { error: familyHealthError } = await supabase.from("family_health").insert(familyHealthToInsert)
        if (familyHealthError) throw familyHealthError
      }

      const studentHealthToInsert = formData.studentHealth
        .filter((health) => health.enfermedad_transtorno)
        .map((health) => ({
          ...health,
          student_id: studentId,
        }))

      if (studentHealthToInsert.length > 0) {
        const { error: studentHealthError } = await supabase.from("student_health").insert(studentHealthToInsert)
        if (studentHealthError) throw studentHealthError
      }

      toast({
        title: isEditing ? "Ficha familiar actualizada" : "Ficha familiar creada",
        description: isEditing
          ? "La ficha familiar se ha actualizado exitosamente."
          : "La ficha familiar se ha registrado exitosamente.",
      })

      router.push(`/dashboard/students/${studentId}`)
    } catch (error) {
      console.error("Error saving family record:", error)
      toast({
        title: "Error",
        description: isEditing
          ? "Hubo un error al actualizar la ficha familiar. Por favor, inténtalo de nuevo."
          : "Hubo un error al crear la ficha familiar. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isEditing ? "Editar Ficha Familiar" : "Ficha Familiar"} - Año Electivo 2025</CardTitle>
            <CardDescription>I.E. CPE "Susana Wesley"</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progreso</p>
            <Progress value={progress} className="w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="student" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos del Estudiante</h3>
                <p className="text-sm text-muted-foreground">Información básica y académica del estudiante</p>
              </div>
              <StudentInfoForm data={formData.student} onChange={(data) => updateFormData("student", data)} />
            </TabsContent>

            <TabsContent value="parents" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos de Padres y Apoderado</h3>
                <p className="text-sm text-muted-foreground">Información personal, laboral y de contacto</p>
              </div>
              <ParentsInfoForm data={formData.parents} onChange={(data) => updateFormData("parents", data)} />
            </TabsContent>

            <TabsContent value="family" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Miembros de la Familia</h3>
                <p className="text-sm text-muted-foreground">Personas que viven en el hogar</p>
              </div>
              <FamilyMembersForm
                data={formData.familyMembers}
                onChange={(data) => updateFormData("familyMembers", data)}
              />
            </TabsContent>

            <TabsContent value="housing" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos de Vivienda</h3>
                <p className="text-sm text-muted-foreground">Condición y características de la vivienda</p>
              </div>
              <HousingInfoForm data={formData.housing} onChange={(data) => updateFormData("housing", data)} />
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos de Salud</h3>
                <p className="text-sm text-muted-foreground">Información médica familiar y del estudiante</p>
              </div>
              <HealthInfoForm
                familyHealthData={formData.familyHealth}
                studentHealthData={formData.studentHealth}
                onFamilyHealthChange={(data) => updateFormData("familyHealth", data)}
                onStudentHealthChange={(data) => updateFormData("studentHealth", data)}
              />
            </TabsContent>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentTabIndex === 0}>
              Anterior
            </Button>
            <div className="flex gap-2">
              {currentTabIndex === tabs.length - 1 ? (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                      ? "Actualizar Ficha Familiar"
                      : "Guardar Ficha Familiar"}
                </Button>
              ) : (
                <Button onClick={handleNext}>Siguiente</Button>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
