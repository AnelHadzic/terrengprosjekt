import React from "react"
import { useNewCompanyContext } from "@/app/contexts/NewCompanyContext"

const BedriftInfo = () => {
  const { companyName, contactPerson, setCompanyName, setContactPerson } =
    useNewCompanyContext()

  return (
    <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold dark:text-white mb-6">
        Informasjon om bedriften
      </h1>

      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Bedriftens navn
        </label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kontaktperson (e-post)
        </label>
        <input
          onChange={(e) => setContactPerson(e.target.value)}
          value={contactPerson}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default BedriftInfo
