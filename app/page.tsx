import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GraduationCap, Users, FileText, BarChart3, TrendingUp, Star, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Sistema Escolar</h1>
                <p className="text-sm text-muted-foreground">CPE "Susana Wesley"</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="outline" className="hidden sm:inline-flex bg-transparent">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Comenzar</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Star className="h-4 w-4 mr-2" />
                  Sistema Educativo Moderno
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                  Gestión Escolar
                  <span className="text-primary block">Inteligente</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                  Administra estudiantes, familias y datos académicos con tecnología avanzada
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/auth/sign-up">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/auth/login">Acceder</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/modern-classroom-with-students-using-tablets-and-i.png"
                  alt="Estudiantes usando tecnología en el aula"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Estudiantes</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Eficiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Todo lo que necesitas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Herramientas completas para la gestión educativa moderna
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/teacher-managing-student-records-on-computer-dashb.png"
                  alt="Gestión de estudiantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="space-y-4">
                <div className="bg-primary/10 p-3 rounded-xl w-fit">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Gestión de Estudiantes</CardTitle>
                <CardDescription className="text-base">
                  Control completo de información estudiantil por niveles educativos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/family-meeting-with-school-counselor-reviewing-doc.png"
                  alt="Fichas familiares"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="space-y-4">
                <div className="bg-accent/10 p-3 rounded-xl w-fit">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Fichas Familiares</CardTitle>
                <CardDescription className="text-base">
                  Registro integral de datos familiares y socioeconómicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/school-administrator-analyzing-charts-and-reports-.png"
                  alt="Reportes y análisis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="space-y-4">
                <div className="bg-secondary/10 p-3 rounded-xl w-fit">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Reportes Inteligentes</CardTitle>
                <CardDescription className="text-base">Análisis estadístico y reportes automatizados</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
                  Tecnología que transforma la educación
                </h3>
                <p className="text-lg text-muted-foreground text-pretty">
                  Optimiza procesos administrativos y mejora la comunicación entre la institución y las familias
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Acceso seguro y controlado",
                  "Interfaz intuitiva y moderna",
                  "Reportes automáticos",
                  "Respaldo en la nube",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/modern-school-building-with-students-and-teachers-.png"
                  alt="Institución educativa moderna"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h3 className="text-3xl lg:text-5xl font-bold text-balance">Comienza tu transformación digital</h3>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Únete a las instituciones que ya confían en nuestro sistema
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/auth/sign-up">
                  Crear Cuenta Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">Sistema Escolar CPE "Susana Wesley"</p>
                <p className="text-sm text-secondary-foreground/70">Gestión educativa moderna</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70">&copy; 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
