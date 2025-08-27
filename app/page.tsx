import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GraduationCap, Users, FileText, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Sistema de Gestión Escolar</h1>
                <p className="text-sm text-gray-600">I.E. CPE "Susana Wesley"</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="outline">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Registrarse</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Gestión Integral de Fichas Familiares</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Sistema moderno y eficiente para la administración de información estudiantil, familiar y académica de la
            Institución Educativa CPE "Susana Wesley"
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-lg w-fit">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Gestión de Estudiantes</CardTitle>
              <CardDescription>
                Administra información completa de estudiantes por niveles: Inicial, Primaria y Secundaria
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-lg w-fit">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Fichas Familiares</CardTitle>
              <CardDescription>
                Registro detallado de datos familiares, vivienda, salud y información socioeconómica
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-lg w-fit">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Reportes y Análisis</CardTitle>
              <CardDescription>
                Genera reportes estadísticos y análisis de la información estudiantil y familiar
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-blue-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
              <p className="text-blue-100 mb-6">
                Accede al sistema para gestionar las fichas familiares de manera eficiente y segura
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-blue-600 border-white hover:bg-white bg-transparent"
                >
                  <Link href="/auth/sign-up">Crear Cuenta</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 I.E. CPE "Susana Wesley" - Sistema de Gestión Escolar</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
