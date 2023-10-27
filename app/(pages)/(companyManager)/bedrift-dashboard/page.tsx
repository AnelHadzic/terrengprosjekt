"use client"
import CompanyDashboard from "@/app/components/company-manager/CompanyDashboard"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CompanyDashboard />
    </main>
  )
}
