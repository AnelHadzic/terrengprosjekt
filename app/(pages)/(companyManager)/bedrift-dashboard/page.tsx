"use client"
import CompanyDashboard from "@/app/components/company-manager/CompanyDashboard"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
  const router = useRouter()
  return (
      <CompanyDashboard />
  )
}
