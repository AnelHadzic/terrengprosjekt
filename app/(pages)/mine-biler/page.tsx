"use client"
import { useUserDataContext } from "@/app/contexts/UserContex"
import React from "react"

const Page = () => {
  const { userData } = useUserDataContext()

  return (
    <>
      <main className="bg-white flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Velg din primær bil
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Du kan redigere dine biler her
          </p>
          <p>Primær bil: {userData?.primaryCarRegNumber}</p>
        </div>
      </main>
    </>
  )
}

export default Page
