import UserWithCompanyInfo from "@/app/lib/model/user/types/UserWithCompanyInfo"
import { Result } from "@/app/types"
import debounce from "@/app/utilities/debounce"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { Fragment, SetStateAction, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

export default function UserList() {
  const [userList, setUserList] = useState<UserWithCompanyInfo[]>([])
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadInitialUsers(setLoading, setError, setUserList)
  }, [])

  const debouncedFetchDataRef = useRef(
    debounce(async (query: string) => {
      try {
        const API_URL = `/api/v2/users?searchQuery=${query}`
        const response = await fetch(API_URL, { method: "GET" })
        const result = (await response.json()) as Result<UserWithCompanyInfo[]>
        if (result.success) {
          setUserList(result.data)
        } else {
          toast.error(
            `Støtte på en feil ved innhenting av brukere. Error: ${result.error}`,
          )
        }
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
      {searchBar(searchQuery, setSearchQuery)}

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

      {userTable(userList, router)}
    </div>
  )
}

function searchBar(searchQuery: string, setSearchQuery: { (value: SetStateAction<string>): void; (arg0: string): void }) {
  return <div className="p-1">
    <input
      type="text"
      id="searchQuery"
      name="searchQuery"
      placeholder="Søk etter for eksempel navn, e-post, bilregnr eller lignende"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300" />
  </div>
}

function userTable(
  userList: UserWithCompanyInfo[],
  router: AppRouterInstance | string[],
) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            E-post
          </th>
          <th scope="col" className="px-6 py-3">
            Bedrift
          </th>
          <th scope="col" className="px-6 py-3">
            Mobilnummer
          </th>
          <th scope="col" className="px-6 py-3">
            Bil regnr.
          </th>
          <th scope="col" className="px-6 py-3">
            Aktiv parkering
          </th>
        </tr>
      </thead>
      <tbody>
        {userList.map((item, index) => (
          <Fragment key={index}>
            <tr
              onClick={() => router.push(`/brukere/${item.email}`)}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900 transition-all cursor-pointer"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.email}
              </th>
              <td className="px-6 py-4">
                {item.companyInfo === undefined
                  ? "Ukjent Bedrift"
                  : item.companyInfo?.companyName}
              </td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">{item.primaryCarRegNumber}</td>
              <td className="px-6 py-4">Temp aktiv status</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

function loadInitialUsers(
  setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setError: { (value: SetStateAction<string>): void; (arg0: string): void },
  setUserList: {
    (value: SetStateAction<UserWithCompanyInfo[]>): void
    (arg0: UserWithCompanyInfo[]): void
  },
) {
  setLoading(true)
  setError("")
  const fetchData = async () => {
    try {
      const API_URL = "/api/v2/users"
      const response = await fetch(API_URL, { method: "GET" })
      const result = (await response.json()) as Result<UserWithCompanyInfo[]>
      if (result.success) {
        setUserList(result.data)
      } else {
        toast.error(
          `Støtte på en feil ved innhenting av brukere. Error: ${result.error}`,
        )
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}
