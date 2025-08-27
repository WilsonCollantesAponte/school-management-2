# Sistema de Gestión Escolar - I.E. CPE "Susana Wesley"

Sistema web profesional para la gestión de fichas familiares y estudiantes, desarrollado con Next.js, Supabase y Prisma ORM.

## Características

- 🔐 **Autenticación segura** con Supabase Auth
- 📊 **Dashboard administrativo** con estadísticas y navegación intuitiva
- 👨‍👩‍👧‍👦 **Gestión de fichas familiares** completas con información de estudiantes, padres y salud
- 🔍 **Búsqueda avanzada** y filtros por múltiples criterios
- 📱 **Diseño responsivo** y profesional
- 🛡️ **Seguridad de datos** con Row Level Security (RLS)

## Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Prisma ORM
- **Autenticación**: Supabase Auth
- **UI Components**: shadcn/ui

## Configuración del Proyecto

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd school-management-system
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
\`\`\`bash
cp .env.example .env.local
\`\`\`

Completa las variables en `.env.local` con tus credenciales de Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave anónima de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de rol de servicio de Supabase
- `DATABASE_URL`: URL de conexión a la base de datos

### 4. Configurar la base de datos

Ejecuta el script SQL para crear las tablas:
\`\`\`sql
-- Ejecutar scripts/001_create_tables.sql en tu base de datos Supabase
\`\`\`

### 5. Ejecutar el proyecto
\`\`\`bash
npm run dev
\`\`\`

El proyecto estará disponible en `http://localhost:3000`

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── auth/                 # Páginas de autenticación
│   ├── dashboard/            # Dashboard y páginas principales
│   │   ├── students/         # Gestión de estudiantes
│   │   ├── family-records/   # Fichas familiares
│   │   ├── search/           # Búsqueda avanzada
│   │   └── reports/          # Reportes
│   └── globals.css
├── components/
│   ├── dashboard/            # Componentes del dashboard
│   ├── forms/                # Formularios
│   ├── students/             # Componentes de estudiantes
│   └── ui/                   # Componentes UI base
├── lib/
│   ├── supabase/             # Configuración de Supabase
│   └── types.ts              # Tipos TypeScript
└── scripts/
    └── 001_create_tables.sql # Script de creación de tablas
\`\`\`

## Funcionalidades Principales

### 1. Autenticación
- Registro e inicio de sesión con email
- Confirmación por email
- Gestión de sesiones segura

### 2. Dashboard
- Estadísticas generales
- Navegación intuitiva
- Acceso rápido a funciones principales

### 3. Gestión de Estudiantes
- Lista completa de estudiantes
- Perfiles detallados
- Filtros por nivel, grado, sección

### 4. Fichas Familiares
- Formularios completos por secciones:
  - Información del estudiante
  - Datos de padres/apoderados
  - Miembros de la familia
  - Información de vivienda
  - Registros de salud

### 5. Búsqueda y Filtros
- Búsqueda global
- Filtros avanzados
- Exportación de datos

## Seguridad

- Row Level Security (RLS) habilitado
- Autenticación requerida para todas las operaciones
- Validación de datos en frontend y backend
- Políticas de acceso granulares

## Soporte

Para soporte técnico o consultas sobre el sistema, contacta al administrador del proyecto.

## Licencia

Este proyecto está desarrollado específicamente para I.E. CPE "Susana Wesley".
