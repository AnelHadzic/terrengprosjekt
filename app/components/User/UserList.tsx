import { IUser } from "@/app/lib/interface/IUser"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

export default function UserList() {
  const [userList, setUserList] = useState<IUser[]>([])
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/users"
        const response = await axios.get(API_URL)
        setUserList(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <td className="px-6 py-4">{item.companyId === "0" ? "Standard Bedrift" : "GET COMPANY NAME"}</td>
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
