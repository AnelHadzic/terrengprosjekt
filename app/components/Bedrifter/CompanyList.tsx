"use client"
import { ICompany } from "@/app/lib/interface/ICompany"
import { Result } from "@/app/types"
import debounce from "@/app/utilities/debounce"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

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
        const API_URL = "/api/v2/companies"
        const response = await fetch(API_URL, { method: "GET" })
        const result = (await response.json()) as Result<ICompany[]>
        //const response = await axios.get(API_URL)
        if (result.success) {
          setCompanyList(result.data)
        } else {
          console.error(result.error)
          setError("Failed to retrieve companies.")
        }
      } catch (err) {
        toast.error(`Feil i kommunikasjon med server. Error: ${err}`)
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
        const API_URL = `/api/v2/companies?searchQuery=${query}`
        const response = await fetch(API_URL, { method: "GET" })
        const result = (await response.json()) as Result<ICompany[]>
        //const response = await axios.get(API_URL)
        if (result.success) {
          setCompanyList(result.data)
        } else {
          setError("Failed to retrieve companies.")
        }
      } catch (err) {
        toast.error(`Feil i kommunikasjon med server. Error: ${err}`)
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

      {companiesTable(companyList, router)}
    </div>
  )
}
function companiesTable(
  companyList: ICompany[],
  router: AppRouterInstance | string[],
) {
  return (
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
  )
}
