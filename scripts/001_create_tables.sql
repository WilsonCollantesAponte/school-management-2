-- Create tables for the school management system
-- I.E. CPE "Susana Wesley" Family Records System

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dni VARCHAR(8) UNIQUE,
  apellido_paterno VARCHAR(100) NOT NULL,
  apellido_materno VARCHAR(100) NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  edad INTEGER,
  nivel VARCHAR(20) CHECK (nivel IN ('Inicial', 'Primaria', 'Secundaria')),
  grado VARCHAR(10),
  seccion VARCHAR(10),
  fecha_nacimiento DATE,
  lugar_nacimiento VARCHAR(200),
  domicilio TEXT,
  ie_procedencia VARCHAR(200),
  tipo_ie VARCHAR(20) CHECK (tipo_ie IN ('ESTATAL', 'PARTICULAR', 'PARROQUIAL')),
  codigo_modular VARCHAR(20),
  codigo_estudiante VARCHAR(20),
  tipo_seguro VARCHAR(20) CHECK (tipo_seguro IN ('SIS', 'ESSALUD', 'PARTICULAR', 'NO TIENE')),
  contacto_emergencia VARCHAR(200),
  vive_con TEXT,
  apoderado_ie VARCHAR(200),
  personas_en_casa INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parents table (for father, mother, and guardian)
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  tipo VARCHAR(20) CHECK (tipo IN ('PAPA', 'MAMA', 'APODERADO')),
  apellidos VARCHAR(200),
  nombres VARCHAR(200),
  religion VARCHAR(100),
  dni VARCHAR(8),
  edad INTEGER,
  fecha_nacimiento DATE,
  grado_instruccion VARCHAR(100),
  estado_civil VARCHAR(50),
  numero_hijos INTEGER,
  oficio_profesion VARCHAR(200),
  ocupacion VARCHAR(200),
  centro_trabajo VARCHAR(200),
  lugar_trabajo VARCHAR(200),
  situacion_laboral VARCHAR(20) CHECK (situacion_laboral IN ('DEPENDIENTE', 'INDEPENDIENTE')),
  ingreso_personal DECIMAL(10,2),
  ingreso_familiar DECIMAL(10,2),
  celular VARCHAR(15),
  email VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members table
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  numero INTEGER,
  parentesco VARCHAR(100),
  apellidos_nombres VARCHAR(200),
  edad INTEGER,
  grado_nivel_estudios VARCHAR(200),
  ie_empresa VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Housing information table
CREATE TABLE IF NOT EXISTS housing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  condicion_vivienda VARCHAR(50) CHECK (condicion_vivienda IN ('PROPIA', 'ALQUILADA', 'DE POSADA EN CASA DE PADRES U OTRO FAMILIAR')),
  calidad_vivienda VARCHAR(20) CHECK (calidad_vivienda IN ('MAT. RUSTICO', 'MAT. NOBLE')),
  numero_pisos VARCHAR(20) CHECK (numero_pisos IN ('1 PISO', '2 PISOS', '3 o MAS PISOS')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family health records table
CREATE TABLE IF NOT EXISTS family_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  nombres_apellidos VARCHAR(200),
  edad INTEGER,
  parentesco VARCHAR(100),
  enfermedad TEXT,
  situacion_actual TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student health records table
CREATE TABLE IF NOT EXISTS student_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  enfermedad_transtorno TEXT,
  fecha_padecimiento DATE,
  situacion_actual TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE housing ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_health ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for students
CREATE POLICY "Users can view their own students" ON students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own students" ON students FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own students" ON students FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own students" ON students FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for parents
CREATE POLICY "Users can view parents of their students" ON parents FOR SELECT USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = parents.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can insert parents for their students" ON parents FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM students WHERE students.id = parents.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can update parents of their students" ON parents FOR UPDATE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = parents.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can delete parents of their students" ON parents FOR DELETE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = parents.student_id AND students.user_id = auth.uid())
);

-- Create RLS policies for family_members
CREATE POLICY "Users can view family members of their students" ON family_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_members.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can insert family members for their students" ON family_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_members.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can update family members of their students" ON family_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_members.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can delete family members of their students" ON family_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_members.student_id AND students.user_id = auth.uid())
);

-- Create RLS policies for housing
CREATE POLICY "Users can view housing of their students" ON housing FOR SELECT USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = housing.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can insert housing for their students" ON housing FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM students WHERE students.id = housing.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can update housing of their students" ON housing FOR UPDATE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = housing.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can delete housing of their students" ON housing FOR DELETE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = housing.student_id AND students.user_id = auth.uid())
);

-- Create RLS policies for family_health
CREATE POLICY "Users can view family health of their students" ON family_health FOR SELECT USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can insert family health for their students" ON family_health FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can update family health of their students" ON family_health FOR UPDATE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can delete family health of their students" ON family_health FOR DELETE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = family_health.student_id AND students.user_id = auth.uid())
);

-- Create RLS policies for student_health
CREATE POLICY "Users can view student health of their students" ON student_health FOR SELECT USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = student_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can insert student health for their students" ON student_health FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM students WHERE students.id = student_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can update student health of their students" ON student_health FOR UPDATE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = student_health.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Users can delete student health of their students" ON student_health FOR DELETE USING (
  EXISTS (SELECT 1 FROM students WHERE students.id = student_health.student_id AND students.user_id = auth.uid())
);
