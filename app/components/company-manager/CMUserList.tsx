import { ICompany } from "@/app/lib/interface/ICompany"
import { IUser } from "@/app/lib/interface/IUser"
import debounce from "@/app/utilities/debounce"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

type UserWithCompany = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  created?: Date
  token?: string
  role?: number
  companyInfo?: ICompany
  carRegNumbers?: string[]
  primaryCarRegNumber?: string
}

export default function UserList() {
  const [currentUserCompany, setCurrentUserCompany] = useState<ICompany>()
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<IUser | undefined>(undefined)
  const [userList, setUserList] = useState<UserWithCompany[]>([])
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`, {
      method: "GET",
    })

    const result = await response.json()
    setUserData(result.data)
    setCurrentUserCompany(result.data.company as ICompany)
  }

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  useEffect(() => {
    setLoading(true)
    setError("")
    const fetchData = async () => {
      try {
        const API_URL = `/api/users?companyId=${currentUserCompany?._id}`
        const response = await axios.get(API_URL)
        setUserList(response.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (currentUserCompany) {
      fetchData()
    }
  }, [currentUserCompany, currentUserCompany?._id])

  const debouncedFetchDataRef = useRef(
    debounce(async (query: string) => {
      if (currentUserCompany) {
        try {
          const API_URL = `/api/users?companyId=${currentUserCompany?._id}&searchQuery=${searchQuery}`
          const response = await axios.get(API_URL)
          const responseUsers = response.data.data as UserWithCompany[]

          setUserList(responseUsers)
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }
    }, 300),
  )

  useEffect(() => {
    setLoading(true)
    setError("")

    debouncedFetchDataRef.current(searchQuery)
  }, [currentUserCompany, searchQuery])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-1">
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          placeholder="Søk etter for eksempel navn, e-post, bilregnr eller lignende"
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
    </div>
  )
}
