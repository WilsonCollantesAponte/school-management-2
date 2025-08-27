import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, GraduationCap } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-balance">Sistema de Gestión Escolar</h1>
          <p className="text-gray-600 mt-2 text-pretty">I.E. CPE "Susana Wesley"</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">¡Registro Exitoso!</CardTitle>
            <CardDescription>Verifica tu correo electrónico para continuar</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Te hemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revisa tu bandeja de
              entrada y haz clic en el enlace para activar tu cuenta antes de iniciar sesión.
            </p>
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link href="/auth/login">Ir a Iniciar Sesión</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
