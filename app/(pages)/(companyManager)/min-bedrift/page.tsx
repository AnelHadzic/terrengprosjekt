"use client"
import MyCompany from "@/app/components/company-manager/MyCompany"
import React from "react"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <MyCompany />
    </main>
  )
}