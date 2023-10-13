import { IUser } from "@/app/lib/interface/IUser"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SingleUser({ email }: { email: string }) {
  const [user, setUser] = useState<IUser>()
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = `http://localhost:3000/api/users/${email}`
        const response = await axios.get(API_URL)
        console.log(response.data.data)

        setUser(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [email])

  const handleEditClick = (user: IUser | undefined) => {
    if (user) {
      //setEditedUser(company)
    }
    setIsEditing(!isEditing)
  }

  const handleDeleteClick = async () => {
    try {
      const API_URL = `http://localhost:3000/api/users/${email}`
      await axios.delete(API_URL)
      router.push("/brukere")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      {/* Details */}
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isEditing ? (
          <>
            <div className="flex mb-6 items-center justify-between">
              <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
                {user?.firstname + " " + user?.lastname}
              </h1>
              <button
                onClick={() => handleEditClick(user)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Endre
              </button>
            </div>
            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              E-post
            </h2>
            <p className="mb-6">{user?.email}</p>

            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Bedrift (id for nå)
            </h2>
            <p className="mb-6">{user?.companyId}</p>

            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Mobilnummer
            </h2>
            <p className="mb-6">{user?.phone}</p>

            <div className="flex items-center justify-between">
              <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                Primærbil
              </h2>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Se alle biler
              </a>
            </div>
            <p className="mb-6">{user?.primaryCarRegNumber}</p>
            <h2 className="text-xl mb-1 font-bold leading-none text-gray-900 dark:text-white">
              Avtale Status
            </h2>
            <p className="mb-6">{"Temp avtale status"}</p>

            <button
              onClick={() => handleDeleteClick()}
              className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300 hover:underline dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
            >
              Slett bruker
            </button>
          </>
        ) : (
          // isEdit mode
          <>
            {/* <form>
              <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
                Bedriftens navn:
              </h2>
              <input
                type="text"
                value={editedCompany.companyName}
                onChange={(e) =>
                  setEditedCompany({
                    ...editedCompany,
                    companyName: e.target.value,
                  })
                }
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
              />
              <h2 className="text-xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
                Kontaktperson:
              </h2>
              <input
                type="text"
                value={editedCompany.contactEmail}
                onChange={(e) =>
                  setEditedCompany({
                    ...editedCompany,
                    contactEmail: e.target.value,
                  })
                }
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
              />

              {editedCompany.companyAgreement && (
                <>
                  <h2 className="text-xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
                    Bedriftsavtale
                  </h2>
                  {editedCompany.companyAgreement.domains &&
                    editedCompany.companyAgreement.domains.length > 0 && (
                      <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        Domener:
                      </h3>
                    )}
                  {editedCompany.companyAgreement.domains &&
                    editedCompany.companyAgreement.domains.map(
                      (item, index) => (
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            setEditedCompany({
                              ...editedCompany,
                              companyAgreement: {
                                ...editedCompany.companyAgreement,
                                domains:
                                  editedCompany.companyAgreement &&
                                  editedCompany.companyAgreement.domains
                                    ? editedCompany.companyAgreement.domains.map(
                                        (domain, i) =>
                                          index === i ? e.target.value : domain,
                                      )
                                    : undefined,
                              },
                            })
                          }
                          key={index}
                          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-4"
                        />
                      ),
                    )}
                  {editedCompany.companyAgreement.emails &&
                    editedCompany.companyAgreement.emails.length > 0 && (
                      <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        E-poster:
                      </h3>
                    )}
                  {editedCompany.companyAgreement.emails &&
                    editedCompany.companyAgreement.emails.length > 0 &&
                    editedCompany.companyAgreement.emails.map((item, index) => (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          setEditedCompany({
                            ...editedCompany,
                            companyAgreement: {
                              ...editedCompany.companyAgreement,
                              emails:
                                editedCompany.companyAgreement &&
                                editedCompany.companyAgreement.emails
                                  ? editedCompany.companyAgreement.emails.map(
                                      (email, i) =>
                                        index === i ? e.target.value : email,
                                    )
                                  : undefined,
                            },
                          })
                        }
                        key={index}
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-4"
                      />
                    ))}
                  {editedCompany.companyAgreement.parkingSpots && (
                    <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                      Parkeringsplasser:
                    </h3>
                  )}
                  {editedCompany.companyAgreement.parkingSpots &&
                    editedCompany.companyAgreement.parkingSpots.length > 0 &&
                    editedCompany.companyAgreement.parkingSpots.map(
                      (item, index) => (
                        <div key={index} className="mb-4 flex">
                          <input
                            type="text"
                            value={String(item.parkingName)}
                            onChange={(e) =>
                              setEditedCompany({
                                ...editedCompany,
                                companyAgreement: {
                                  ...editedCompany.companyAgreement,
                                  parkingSpots:
                                    editedCompany.companyAgreement &&
                                    editedCompany.companyAgreement.parkingSpots
                                      ? (editedCompany.companyAgreement.parkingSpots.map(
                                          (spot, i) =>
                                            index === i
                                              ? {
                                                  ...spot,
                                                  parkingName: e.target.value,
                                                }
                                              : spot,
                                        ) as [
                                          {
                                            parkingName: String
                                            parkingLimit: Number
                                          },
                                        ])
                                      : undefined,
                                },
                              })
                            }
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                          />
                          <input
                            type="text"
                            value={String(item.parkingLimit)}
                            onChange={(e) =>
                              setEditedCompany({
                                ...editedCompany,
                                companyAgreement: {
                                  ...editedCompany.companyAgreement,
                                  parkingSpots:
                                    editedCompany.companyAgreement &&
                                    editedCompany.companyAgreement.parkingSpots
                                      ? (editedCompany.companyAgreement.parkingSpots.map(
                                          (spot, i) =>
                                            index === i
                                              ? {
                                                  ...spot,
                                                  parkingLimit: e.target.value,
                                                }
                                              : spot,
                                        ) as [
                                          {
                                            parkingName: String
                                            parkingLimit: Number
                                          },
                                        ])
                                      : undefined,
                                },
                              })
                            }
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                          />
                        </div>
                      ),
                    )} */}
          </>
        )}
      </div>
      {/* history */}

      <div className="w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Dato
              </th>
              <th scope="col" className="px-6 py-3">
                Hendelse
              </th>
              <th scope="col" className="px-6 py-3">
                Utført av
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">Endret primærbil.</td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">
                Lang tekst for å forklare nøyaktig hva som skjedde med denne
                Brukeren.
              </td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">Brukeren ble opprettet</td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
