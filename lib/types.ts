export interface Student {
  id: string
  user_id: string
  dni?: string
  apellido_paterno: string
  apellido_materno: string
  nombres: string
  edad?: number
  nivel: "Inicial" | "Primaria" | "Secundaria"
  grado?: string
  seccion?: string
  fecha_nacimiento?: string
  lugar_nacimiento?: string
  domicilio?: string
  ie_procedencia?: string
  tipo_ie?: "ESTATAL" | "PARTICULAR" | "PARROQUIAL"
  codigo_modular?: string
  codigo_estudiante?: string
  tipo_seguro?: "SIS" | "ESSALUD" | "PARTICULAR" | "NO TIENE"
  contacto_emergencia?: string
  vive_con?: string
  apoderado_ie?: string
  personas_en_casa?: number
  created_at?: string
  updated_at?: string
}

export interface Parent {
  id: string
  student_id: string
  tipo: "PAPA" | "MAMA" | "APODERADO"
  apellidos?: string
  nombres?: string
  religion?: string
  dni?: string
  edad?: number
  fecha_nacimiento?: string
  grado_instruccion?: string
  estado_civil?: string
  numero_hijos?: number
  oficio_profesion?: string
  ocupacion?: string
  centro_trabajo?: string
  lugar_trabajo?: string
  situacion_laboral?: "DEPENDIENTE" | "INDEPENDIENTE"
  ingreso_personal?: number
  ingreso_familiar?: number
  celular?: string
  email?: string
  created_at?: string
  updated_at?: string
}

export interface FamilyMember {
  id: string
  student_id: string
  numero?: number
  parentesco?: string
  apellidos_nombres?: string
  edad?: number
  grado_nivel_estudios?: string
  ie_empresa?: string
  created_at?: string
}

export interface Housing {
  id: string
  student_id: string
  condicion_vivienda?: "PROPIA" | "ALQUILADA" | "DE POSADA EN CASA DE PADRES U OTRO FAMILIAR"
  calidad_vivienda?: "MAT. RUSTICO" | "MAT. NOBLE"
  numero_pisos?: "1 PISO" | "2 PISOS" | "3 o MAS PISOS"
  created_at?: string
  updated_at?: string
}

export interface FamilyHealth {
  id: string
  student_id: string
  nombres_apellidos?: string
  edad?: number
  parentesco?: string
  enfermedad?: string
  situacion_actual?: string
  created_at?: string
  updated_at?: string
}

export interface StudentHealth {
  id: string
  student_id: string
  enfermedad_transtorno?: string
  fecha_padecimiento?: string
  situacion_actual?: string
  created_at?: string
  updated_at?: string
}

export interface FamilyRecord {
  student: Student
  parents: Parent[]
  family_members: FamilyMember[]
  housing?: Housing
  family_health: FamilyHealth[]
  student_health: StudentHealth[]
}
