"use client"
import { ICompany } from "@/app/lib/interface/ICompany"
import debounce from "@/app/utilities/debounce"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

export default function CompanyList() {
  const [companyList, setCompanyList] = useState<ICompany[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const router = useRouter()
  useEffect(() => {
    setLoading(true)
    setError("")
    const fetchData = async () => {
      try {
        const API_URL = "/api/company"
        const response = await axios.get(API_URL)
        console.log(response.data.data)
        setCompanyList(response.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const debouncedFetchDataRef = useRef(
    debounce(async (query: string) => {
      try {
        const API_URL = `/api/company?searchQuery=${query}`
        const response = await axios.get(API_URL)

        setCompanyList(response.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }, 300),
  )

  useEffect(() => {
    setLoading(true)
    setError("")
    debouncedFetchDataRef.current(searchQuery)
  }, [searchQuery])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-1">
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          placeholder="Søk etter for eksempel bedriftsnavn, domene, parkeringsplass eller lignende"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {loading && (
        <p className="p-6 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900">
          Loading...
        </p>
      )}
      {error && (
        <p className="p-6 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900">
          {error}
        </p>
      )}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Bedriftnavn
            </th>
            <th scope="col" className="px-6 py-3">
              Bedriftavtale status
            </th>
            <th scope="col" className="px-6 py-3">
              Privatavtale status
            </th>
            <th scope="col" className="px-6 py-3">
              Brukere
            </th>
            <th scope="col" className="px-6 py-3">
              Interne kommentarer
            </th>
          </tr>
        </thead>
        <tbody>
          {companyList.map((item, index) => (
            <Fragment key={index}>
              <tr
                onClick={() => router.push(`/bedrifter/${item._id}`)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900 transition-all cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.companyName}
                </th>
                <td className="px-6 py-4">
                  {item.companyAgreement ? "OK" : "Ingen avtale"}
                </td>
                <td className="px-6 py-4">
                  {item.privateAgreement ? "OK" : "Ingen avtale"}
                </td>
                <td className="px-6 py-4">{"123"}</td>
                <td className="px-6 py-4">{item.internalComment}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
