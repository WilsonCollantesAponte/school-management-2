"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Users, Home, Heart, FileText, Calendar, Phone, Mail } from "lucide-react"
import type { Student, Parent, FamilyMember, Housing, FamilyHealth, StudentHealth } from "@/lib/types"

interface FamilyRecord {
  student: Student
  parents: Parent[]
  family_members: FamilyMember[]
  housing: Housing | null
  family_health: FamilyHealth[]
  student_health: StudentHealth[]
}

interface StudentProfileProps {
  familyRecord: FamilyRecord
}

export function StudentProfile({ familyRecord }: StudentProfileProps) {
  const { student, parents, family_members, housing, family_health, student_health } = familyRecord

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No registrado"
    return new Date(dateString).toLocaleDateString("es-PE")
  }

  return (
    <div className="space-y-6">
      {/* Student Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                </CardTitle>
                <CardDescription>Información general del estudiante</CardDescription>
              </div>
            </div>
            <Badge className={getLevelColor(student.nivel)}>{student.nivel}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">DNI</p>
              <p className="text-lg">{student.dni || "No registrado"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Edad</p>
              <p className="text-lg">{student.edad ? `${student.edad} años` : "No registrado"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Grado y Sección</p>
              <p className="text-lg">
                {student.grado && student.seccion
                  ? `${student.grado} - ${student.seccion}`
                  : student.grado || "No registrado"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
              <p className="text-lg">{formatDate(student.fecha_nacimiento)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="parents">Padres</TabsTrigger>
          <TabsTrigger value="family">Familia</TabsTrigger>
          <TabsTrigger value="housing">Vivienda</TabsTrigger>
          <TabsTrigger value="health">Salud</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Lugar de Nacimiento</p>
                    <p>{student.lugar_nacimiento || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Domicilio</p>
                    <p>{student.domicilio || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">I.E. de Procedencia</p>
                    <p>{student.ie_procedencia || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Tipo de I.E.</p>
                    <p>{student.tipo_ie || "No registrado"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Código Modular</p>
                    <p>{student.codigo_modular || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Código del Estudiante</p>
                    <p>{student.codigo_estudiante || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Tipo de Seguro Médico</p>
                    <p>{student.tipo_seguro || "No registrado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Contacto de Emergencia</p>
                    <p>{student.contacto_emergencia || "No registrado"}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">¿Con quién vive el alumno?</p>
                  <p>{student.vive_con || "No registrado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Apoderado ante la I.E.</p>
                  <p>{student.apoderado_ie || "No registrado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Personas en casa</p>
                  <p>{student.personas_en_casa || "No registrado"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parents" className="space-y-6">
          {parents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No hay información de padres registrada</p>
              </CardContent>
            </Card>
          ) : (
            parents.map((parent, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {parent.tipo === "PAPA" ? "Papá" : parent.tipo === "MAMA" ? "Mamá" : "Apoderado"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Nombres y Apellidos</p>
                        <p className="font-medium">
                          {parent.nombres} {parent.apellidos}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">DNI</p>
                        <p>{parent.dni || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Edad</p>
                        <p>{parent.edad ? `${parent.edad} años` : "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Fecha de Nacimiento</p>
                        <p>{formatDate(parent.fecha_nacimiento)}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Religión</p>
                        <p>{parent.religion || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Grado de Instrucción</p>
                        <p>{parent.grado_instruccion || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Estado Civil</p>
                        <p>{parent.estado_civil || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Número de Hijos</p>
                        <p>{parent.numero_hijos || "No registrado"}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Oficio/Profesión</p>
                        <p>{parent.oficio_profesion || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Ocupación</p>
                        <p>{parent.ocupacion || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Centro de Trabajo</p>
                        <p>{parent.centro_trabajo || "No registrado"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Situación Laboral</p>
                        <p>{parent.situacion_laboral || "No registrado"}</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Ingreso Personal</p>
                      <p>{parent.ingreso_personal ? `S/ ${parent.ingreso_personal}` : "No registrado"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Ingreso Familiar</p>
                      <p>{parent.ingreso_familiar ? `S/ ${parent.ingreso_familiar}` : "No registrado"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Celular</p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {parent.celular || "No registrado"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {parent.email || "No registrado"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Miembros de la Familia
              </CardTitle>
              <CardDescription>Personas que viven en el hogar</CardDescription>
            </CardHeader>
            <CardContent>
              {family_members.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No hay miembros de familia registrados</p>
              ) : (
                <div className="space-y-4">
                  {family_members.map((member, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Parentesco</p>
                          <p>{member.parentesco || "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Nombres y Apellidos</p>
                          <p className="font-medium">{member.apellidos_nombres || "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Edad</p>
                          <p>{member.edad ? `${member.edad} años` : "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Grado/Nivel de Estudios</p>
                          <p>{member.grado_nivel_estudios || "No registrado"}</p>
                        </div>
                      </div>
                      {member.ie_empresa && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-500 mb-1">I.E./Empresa</p>
                          <p>{member.ie_empresa}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Información de Vivienda
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!housing ? (
                <p className="text-center py-8 text-gray-500">No hay información de vivienda registrada</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Condición de la Vivienda</p>
                    <p className="text-lg">{housing.condicion_vivienda || "No registrado"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Calidad de la Vivienda</p>
                    <p className="text-lg">{housing.calidad_vivienda || "No registrado"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Número de Pisos</p>
                    <p className="text-lg">{housing.numero_pisos || "No registrado"}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {/* Family Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Salud Familiar
              </CardTitle>
              <CardDescription>Miembros de la familia con problemas de salud</CardDescription>
            </CardHeader>
            <CardContent>
              {family_health.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No hay registros de salud familiar</p>
              ) : (
                <div className="space-y-4">
                  {family_health.map((health, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Nombres y Apellidos</p>
                          <p className="font-medium">{health.nombres_apellidos || "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Edad</p>
                          <p>{health.edad ? `${health.edad} años` : "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Parentesco</p>
                          <p>{health.parentesco || "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Situación Actual</p>
                          <p>{health.situacion_actual || "No registrado"}</p>
                        </div>
                      </div>
                      {health.enfermedad && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-500 mb-1">Enfermedad</p>
                          <p>{health.enfermedad}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Salud del Estudiante
              </CardTitle>
              <CardDescription>Problemas de salud específicos del estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              {student_health.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No hay registros de salud del estudiante</p>
              ) : (
                <div className="space-y-4">
                  {student_health.map((health, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Fecha de Padecimiento</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(health.fecha_padecimiento)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Situación Actual</p>
                          <p>{health.situacion_actual || "No registrado"}</p>
                        </div>
                      </div>
                      {health.enfermedad_transtorno && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-500 mb-1">Enfermedad/Trastorno/Padecimiento</p>
                          <p>{health.enfermedad_transtorno}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
