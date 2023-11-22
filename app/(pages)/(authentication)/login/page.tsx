"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"

const Page = () => {
  const [email, setEmail] = useState("")

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const result = await signIn("email", {
      email: email,
      redirect: true,
      callbackUrl: "/",
    })
  }

  return (
    <>
      <div className="mb-20"></div>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={onSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Værste login
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Din jobb e-post
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="navn@bedrift.no"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logg inn
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Page
