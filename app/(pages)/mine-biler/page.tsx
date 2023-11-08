"use client"
import MyCars from "@/app/components/MyCars/MyCars"
import { useUserDataContext } from "@/app/contexts/UserContex"
import React from "react"

const Page = () => {
  const { userData } = useUserDataContext()

  return (
    <>
      <div className="mb-6"></div>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Velg din primær bil
          </h5>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

          <MyCars />
        </div>
      </main>
    </>
  )
}

export default Page
