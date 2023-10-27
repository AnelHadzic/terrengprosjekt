"use client"
import MyCompany from "@/app/components/company-manager/MyCompany"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <MyCompany />
    </main>
  )
}