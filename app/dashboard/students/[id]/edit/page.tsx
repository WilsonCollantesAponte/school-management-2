import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FamilyRecordForm } from "@/components/forms/family-record-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function EditStudentPage({
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

  const existingData = {
    student,
    parents: parents || [],
    family_members: familyMembers || [],
    housing: housing || null,
    family_health: familyHealth || [],
    student_health: studentHealth || [],
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/students/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Ficha Familiar</h1>
            <p className="text-gray-600">
              {student.nombres} {student.apellido_paterno} {student.apellido_materno}
            </p>
          </div>
        </div>
      </div>

      <FamilyRecordForm existingData={existingData} isEditing={true} />
    </div>
  )
}
