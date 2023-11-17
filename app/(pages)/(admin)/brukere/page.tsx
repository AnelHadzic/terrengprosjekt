"use client"
import UserList from "@/app/components/User/UserList"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-12">
      <h1 className="text-2xl mb-8 font-bold leading-none text-gray-900 dark:text-white">
        Alle brukere
      </h1>
      <UserList />
      <button
        type="button"
        onClick={() => router.push("/ny-bruker")}
        className="text-white bg-blue-700 mt-6 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Legg til ny bruker
      </button>
    </main>
  )
}
