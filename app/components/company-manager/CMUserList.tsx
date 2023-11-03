import { ICompany } from "@/app/lib/interface/ICompany"
import { IUser } from "@/app/lib/interface/IUser"
import UserWithCompany from "@/app/lib/types/UserWithCompany"
import debounce from "@/app/utilities/debounce"
import axios, { HttpStatusCode } from "axios"
import { STATUS_CODES } from "http"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

type UserWithStatus = UserWithCompany & {
  status: string
}

export default function UserList() {
  const [currentUserCompany, setCurrentUserCompany] = useState<ICompany>()
  const { data: session, status } = useSession()
  const [userList, setUserList] = useState<UserWithStatus[]>([])
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newUser, setNewUser] = useState<UserWithStatus | null>(null)

  const handleAddNewUser = () => {
    const defaultUser: UserWithStatus = {
      email: "",
      companyInfo: currentUserCompany,
      phone: "",
      primaryCarRegNumber: "",
      status: "NoAgreement",
    }
    setNewUser(defaultUser)
  }

  const handleSaveNewUser = async () => {
    if (newUser) {
      let isValidUpdate = true
      switch (newUser.status) {
        case "ListByPrivateAgreement":
          if (newUser.companyInfo?.privateAgreement) {
            if (
              !newUser.companyInfo?.privateAgreement.emails?.includes(
                newUser.email,
              )
            ) {
              newUser.companyInfo.privateAgreement.emails?.push(newUser.email)
            } else {
              toast.error("Denne e-posten finnes allerede i whitelist.")
              isValidUpdate = false
            }
          } else {
            toast.error("Bedriften har ingen privatavtale.")
            isValidUpdate = false
          }
          break

        case "ListByCompanyAgreement":
          if (newUser.companyInfo?.companyAgreement) {
            if (
              !newUser.companyInfo?.companyAgreement.emails?.includes(
                newUser.email,
              )
            ) {
              newUser.companyInfo.companyAgreement.emails?.push(newUser.email)
            } else {
              toast.error("Denne e-posten finnes allerede i whitelist.")

              isValidUpdate = false
            }
          } else {
            toast.error("Bedriften har ingen bedriftsavtale.")
            isValidUpdate = false
          }
          break

        case "NoAgreement":
          break

        default:
          isValidUpdate = false
          break
      }

      if (isValidUpdate) {
        try {
          if (newUser.status != "NoAgreement") {
            await axios.patch(
              `/api/company/${newUser.companyInfo?._id}`,
              newUser.companyInfo,
            )
          }

          const correctedUser: IUser = {
            email: newUser.email,
            company: newUser.companyInfo?._id,
            role: 2,
          }

          const userResult = await axios.post(`/api/users/`, correctedUser)
          console.log(userResult)

          if (userResult.status == HttpStatusCode.Created) {
            setUserList((prevUserList) => [...prevUserList, newUser])
            toast.success(
              `Brukeren ${newUser.email} har blitt opprettet og lagt i whitelist.`,
            )
            setNewUser(null)
          }
        } catch (error) {
          toast.error("Oppdatering feilet. Kontakt administrator.")
          console.error("Error updating agreement type:", error)
        }
      } else {
        console.error("Invalid update.")
      }
    }
  }

  const handleCancelNewUser = () => {
    if (newUser) {
      setNewUser(null)
    }
  }

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`, {
      method: "GET",
    })

    const result = await response.json()
    setCurrentUserCompany(result.data.company as ICompany)
  }

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  const fetchUserStatus = async (email: string) => {
    try {
      const response = await axios.get(`/api/company?email=${email}`)
      return response.data.data.agreementType
    } catch (err) {
      console.error(err)
      return "Error fetching status"
    }
  }

  useEffect(() => {
    setLoading(true)
    setError("")
    const fetchData = async () => {
      try {
        const API_URL = `/api/users?companyId=${currentUserCompany?._id}`
        const response = await axios.get(API_URL)
        const users = response.data.data as UserWithCompany[]

        const updatedUserList = await Promise.all(
          users.map(async (user: UserWithCompany) => {
            const status = await fetchUserStatus(user.email)
            return { ...user, status }
          }),
        )

        setUserList(updatedUserList)
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
    debounce(async (query: string, company: ICompany) => {
      if (company) {
        try {
          const API_URL = `/api/users?companyId=${company._id}&searchQuery=${query}`
          const response = await axios.get(API_URL)
          const responseUsers = response.data.data as UserWithStatus[]

          const updatedUserList = await Promise.all(
            responseUsers.map(async (user: UserWithCompany) => {
              const status = await fetchUserStatus(user.email)
              return { ...user, status }
            }),
          )

          setUserList(updatedUserList)
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

    debouncedFetchDataRef.current(searchQuery, currentUserCompany)
  }, [currentUserCompany, searchQuery])

  const handleAgreementTypeChange = async (
    user: UserWithStatus,
    newAgreementType: string,
  ) => {
    let isValidUpdate = true
    switch (newAgreementType) {
      case "ListByPrivateAgreement":
        if (user.companyInfo?.privateAgreement) {
          if (
            !user.companyInfo?.privateAgreement.emails?.includes(user.email)
          ) {
            user.companyInfo.privateAgreement.emails?.push(user.email)
          } else {
            isValidUpdate = false
          }
        } else {
          toast.error("Bedriften har ingen privatavtale.")
          isValidUpdate = false
        }
        break

      case "ListByCompanyAgreement":
        if (user.companyInfo?.companyAgreement) {
          if (
            !user.companyInfo?.companyAgreement.emails?.includes(user.email)
          ) {
            user.companyInfo.companyAgreement.emails?.push(user.email)
          } else {
            isValidUpdate = false
          }
        } else {
          toast.error("Bedriften har ingen bedriftsavtale.")
          isValidUpdate = false
        }
        break

      case "NoAgreement":
        // Remove from both whitelists
        if (user.companyInfo?.privateAgreement) {
          if (user.companyInfo?.privateAgreement.emails?.includes(user.email)) {
            user.companyInfo.privateAgreement.emails =
              user.companyInfo.privateAgreement.emails.filter(
                (email) => email !== user.email,
              )
          }
        }
        if (user.companyInfo?.companyAgreement) {
          if (user.companyInfo?.companyAgreement.emails?.includes(user.email)) {
            user.companyInfo.companyAgreement.emails =
              user.companyInfo.companyAgreement.emails.filter(
                (email) => email !== user.email,
              )
          }
        }
        break

      default:
        isValidUpdate = false
        break
    }

    if (isValidUpdate) {
      try {
        await axios.patch(
          `/api/company/${user.companyInfo?._id}`,
          user.companyInfo,
        )

        setUserList((prevUserList) => {
          const updatedUserList = [...prevUserList]
          const userIndex = updatedUserList.findIndex(
            (u) => u.email === user.email,
          )
          updatedUserList[userIndex] = { ...user, status: newAgreementType }
          return updatedUserList
        })
      } catch (error) {
        toast.error("Oppdatering feilet. Kontakt administrator.")
        console.error("Error updating agreement type:", error)
      }
    } else {
      console.error("Invalid update.")
    }
  }

  return (
    <>
      <div className="border-t-2 mt-8 border-gray-200 mb-4">
        <h2 className="text-xl pl-4 mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
          Brukere ({userList.length})
        </h2>
      </div>
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

        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900 transition-all cursor-pointer">
                  <th
                    scope="row"
                    className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
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
                  <td
                    className={`px-6 py-4 ${
                      item.status === "NoAgreement" ? "text-red-500" : ""
                    }`}
                  >
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleAgreementTypeChange(item, e.target.value)
                      }
                    >
                      <option value="ListByPrivateAgreement">
                        Privat (whitelist)
                      </option>
                      <option value="ListByCompanyAgreement">
                        Bedrift (whitelist)
                      </option>
                      <option value="NoAgreement">Ingen whitelist</option>
                      <option value="DomainByPrivateAgreement" disabled>
                        Privat (fra domene)
                      </option>
                      <option value="DomainByCompanyAgreement" disabled>
                        Bedrift (fra domene)
                      </option>
                    </select>
                  </td>
                </tr>
              </Fragment>
            ))}

            {newUser && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 transition-all cursor-pointer">
                <td className="px-6 py-4">
                  <input
                    className="w-36"
                    type="text"
                    placeholder="ola@nordmann.no"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  {newUser.companyInfo?.companyName}
                </td>
                <td
                  onClick={() =>
                    toast.warning(
                      "Mobilnummer skal settes av bruker ved først login.",
                    )
                  }
                  className="px-6 py-4"
                ></td>
                <td
                  onClick={() =>
                    toast.warn("Regnr skal settes av bruker ved først login.")
                  }
                  className="px-6 py-4"
                ></td>
                <td
                  className={`px-6 py-4 ${
                    newUser.status === "NoAgreement" ? "text-red-500" : ""
                  }`}
                >
                  <select
                    value={newUser.status}
                    onChange={(e) =>
                      setNewUser({ ...newUser, status: e.target.value })
                    }
                  >
                    <option value="ListByPrivateAgreement">
                      Privat (whitelist)
                    </option>
                    <option value="ListByCompanyAgreement">
                      Bedrift (whitelist)
                    </option>
                    <option value="NoAgreement">Ingen whitelist</option>
                    <option value="DomainByPrivateAgreement" disabled>
                      Privat (fra domene)
                    </option>
                    <option value="DomainByCompanyAgreement" disabled>
                      Bedrift (fra domene)
                    </option>
                  </select>
                </td>
              </tr>
            )}

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-900  transition-all cursor-pointer">
              {newUser ? (
                <>
                  <td
                    onClick={() => handleSaveNewUser()}
                    colSpan={3}
                    className="px-6 py-4 hover:bg-green-100 hover:underline"
                  >
                    Lagre
                  </td>
                  <td
                    onClick={() => handleCancelNewUser()}
                    colSpan={2}
                    className="px-6 py-4 hover:bg-red-100 hover:underline"
                  >
                    Avbryt
                  </td>
                </>
              ) : (
                <td
                  onClick={() => handleAddNewUser()}
                  colSpan={5}
                  className="px-6 py-4 hover:bg-green-100 hover:underline"
                >
                  + Legg til ny bruker i whitelist
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <button className="flex items-center p-2 border mt-6 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none active:bg-gray-200">
        Importer fra CSV{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            d="M16.792 11.6249V4.52075L23.8962 11.6249M7.75033 2.58325C6.31658 2.58325 5.16699 3.73284 5.16699 5.16658V25.8332C5.16699 26.5184 5.43916 27.1755 5.92363 27.6599C6.4081 28.1444 7.06518 28.4166 7.75033 28.4166H23.2503C23.9355 28.4166 24.5925 28.1444 25.077 27.6599C25.5615 27.1755 25.8337 26.5184 25.8337 25.8332V10.3333L18.0837 2.58325H7.75033Z"
            fill="black"
          />
        </svg>
      </button>
    </>
  )
}
