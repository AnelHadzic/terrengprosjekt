import React, { useContext } from "react"
import { useNewCompanyContext } from "@/app/contexts/NewCompanyContext"

const DomeneComponent = ({ header }: { header: string }) => {
  const { domains, setDomains } = useNewCompanyContext()

  const addInput = (index: number, newValue: string) => {
    const newDomains = [...domains]
    newDomains[index] = newValue

    setDomains(newDomains)
  }

  //  Legge til flere domener knapp.
  const addDomain = () => {
    setDomains([...domains, ""])
  }

  // Fjerne spesifikke domener, søppel knapp
  const removeDomain = (domainIndex: number) => {
    const filterDomains = domains.filter((_, index) => index !== domainIndex)
    setDomains(filterDomains)
  }

  return (
    <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold dark:text-white mb-6">{header}</h1>
      <label
        htmlFor="bedrifts_domener"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Domener
      </label>
      {domains.map((domain, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-row ...">
            <input
              type="text"
              placeholder="hiof.no"
              value={domain}
              onChange={(e) => addInput(index, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="mr-6"></div>
            {index > 0 ? (
              <svg
                className="w-6 h-6 text-red-500 dark:text-white hover:text-red-800 cursor-pointer ..."
                onClick={() => removeDomain(index)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
              </svg>
            ) : null}
          </div>
          <div className="mb-6"></div>
        </React.Fragment>
      ))}
      <div className="flex flex-row-reverse ...">
        <button
          type="button"
          onClick={addDomain}
          className="py-2.5 flex px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <div className="mr-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              ></path>
            </svg>
          </div>
          Legg til domene
        </button>
      </div>
    </div>
  )
}

export default DomeneComponent
