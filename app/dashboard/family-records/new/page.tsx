import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FamilyRecordForm } from "@/components/forms/family-record-form"

export default async function NewFamilyRecordPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nueva Ficha Familiar</h1>
        <p className="text-gray-600">Registro completo de información estudiantil y familiar</p>
      </div>
      <FamilyRecordForm userId={user.id} />
    </div>
  )
}
