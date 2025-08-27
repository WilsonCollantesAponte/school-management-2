import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StudentProfile } from "@/components/students/student-profile"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { id } = await params

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch student with all related data
  const { data: student, error: studentError } = await supabase.from("students").select("*").eq("id", id).single()

  if (studentError || !student) {
    notFound()
  }

  // Fetch related data
  const [
    { data: parents },
    { data: familyMembers },
    { data: housing },
    { data: familyHealth },
    { data: studentHealth },
  ] = await Promise.all([
    supabase.from("parents").select("*").eq("student_id", id).order("tipo"),
    supabase.from("family_members").select("*").eq("student_id", id).order("numero"),
    supabase.from("housing").select("*").eq("student_id", id).single(),
    supabase.from("family_health").select("*").eq("student_id", id),
    supabase.from("student_health").select("*").eq("student_id", id),
  ])

  const familyRecord = {
    student,
    parents: parents || [],
    family_members: familyMembers || [],
    housing: housing || null,
    family_health: familyHealth || [],
    student_health: studentHealth || [],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader user={user} />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard/students">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Volver
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {student.nombres} {student.apellido_paterno} {student.apellido_materno}
                    </h1>
                    <p className="text-gray-600">Ficha Familiar Completa</p>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/dashboard/students/${id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Link>
                </Button>
              </div>
            </div>

            <StudentProfile familyRecord={familyRecord} />
          </div>
        </main>
      </div>
    </div>
  )
}
