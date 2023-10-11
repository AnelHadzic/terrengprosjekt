import axios from "axios"
import { ICompany } from "@/app/lib/interface/ICompany"
import { Fragment, useEffect, useState } from "react"

export default function SingleCompany({ companyId }: { companyId: string }) {
  const [company, setCompany] = useState<ICompany>()
  const [isEditing, setIsEditing] = useState(false)

  const [editedCompany, setEditedCompany] = useState<ICompany>({
    companyName: "",
    contactEmail: "",
    companyAgreement: {},
    privateAgreement: {},
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = `http://localhost:3000/api/company/${companyId}`
        const response = await axios.get(API_URL)
        console.log(response.data.data)

        setCompany(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [companyId])

  const handleEditClick = (company: ICompany | undefined) => {
    if (company) {
      setEditedCompany(company)
    }
    setIsEditing(!isEditing)
  }

  const handleSaveClick = async () => {
    try {
      // Send a PUT request with editedCompany to update the data
      const API_URL = `http://localhost:3000/api/company/${companyId}`
      await axios.patch(API_URL, editedCompany)
      setIsEditing(false)
      setCompany(editedCompany)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancelEditClick = () => {
    // Reset editedCompany to the original company data
    setEditedCompany({
      companyName: "",
      contactEmail: "",
      companyAgreement: {},
      privateAgreement: {},
    })
    setIsEditing(false)
  }

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      {/* Details */}
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isEditing ? (
          <>
            <div className="flex mb-6 items-center justify-between">
              <h1 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
                {company?.companyName}
              </h1>
              <button
                onClick={() => handleEditClick(company)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Endre
              </button>
            </div>
            <h2 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
              Kontaktperson
            </h2>
            <p className="mb-6">{company?.contactEmail}</p>
            {company?.companyAgreement ? (
              <>
                <h2 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
                  Bedriftsavtale
                </h2>
                {Array.isArray(company.companyAgreement.domains) &&
                company.companyAgreement.domains.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="text-l mb-2 font-bold leading-none text-gray-900 dark:text-white">
                      Domener:
                    </h3>
                    {company.companyAgreement.domains.map((item, index) => (
                      <Fragment key={index}>
                        <p>{item}</p>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
                {Array.isArray(company.companyAgreement.emails) &&
                company.companyAgreement.emails.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                      e-poster:
                    </h3>
                    {company.companyAgreement.emails.map((item, index) => (
                      <Fragment key={index}>
                        <p>{item}</p>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
                <div className="mb-6"></div>
                {Array.isArray(company.companyAgreement.parkingSpots) &&
                company.companyAgreement.parkingSpots.length > 0 ? (
                  <div className="mb-6">
                    <p>Parkeringsplass: antall plasser</p>
                    {company.companyAgreement.parkingSpots.map(
                      (item, index) => (
                        <Fragment key={index}>
                          <p>
                            {item.parkingName}: {String(item.parkingLimit)}
                          </p>
                        </Fragment>
                      ),
                    )}
                  </div>
                ) : null}
              </>
            ) : null}
            {company?.privateAgreement ? (
              <>
                <h2 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
                  Privat avtale
                </h2>
                {Array.isArray(company.privateAgreement.domains) &&
                company.privateAgreement.domains.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                      Domener:
                    </h3>
                    {company.privateAgreement.domains.map((item, index) => (
                      <Fragment key={index}>
                        <p>{item}</p>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
                {Array.isArray(company.privateAgreement.emails) &&
                company.privateAgreement.emails.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                      e-poster:
                    </h3>
                    {company.privateAgreement.emails.map((item, index) => (
                      <Fragment key={index}>
                        <p>{item}</p>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
                <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                  Parkeringsplasser:
                </h3>
                {Array.isArray(company.privateAgreement.parkingSpots) &&
                company.privateAgreement.parkingSpots.length > 0 ? (
                  <div className="mb-6">
                    <p>Parkeringsplass: antall plasser</p>
                    {company.privateAgreement.parkingSpots.map(
                      (item, index) => (
                        <Fragment key={index}>
                          <p>
                            {item.parkingName}: {String(item.parkingLimit)}
                          </p>
                        </Fragment>
                      ),
                    )}
                  </div>
                ) : null}
              </>
            ) : null}
            <div className="flex items-center justify-between">
              <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                Antall brukere
              </h2>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Se alle
              </a>
            </div>
            <p className="mb-6">85</p>{" "}
          </>
        ) : (
          // isEdit mode
          <>
            <form>
              {/* Input fields for editing */}
              <h2 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
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
              <h2 className="text-2xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
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

              {/* Input fields for editing companyAgreement */}
              {editedCompany.companyAgreement && (
                <>
                  <h2 className="text-2xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
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
                    )}
                </>
              )}

              {/* Input fields for editing privateAgreement */}
              {editedCompany.privateAgreement && (
                <>
                  <h2 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
                    Privat avtale
                  </h2>
                  {editedCompany.privateAgreement.domains &&
                    editedCompany.privateAgreement.domains.length > 0 && (
                      <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        Domener:
                      </h3>
                    )}
                  {editedCompany.privateAgreement.domains &&
                    editedCompany.privateAgreement.domains.map(
                      (item, index) => (
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            setEditedCompany({
                              ...editedCompany,
                              privateAgreement: {
                                ...editedCompany.privateAgreement,
                                domains:
                                  editedCompany.privateAgreement &&
                                  editedCompany.privateAgreement.domains
                                    ? editedCompany.privateAgreement.domains.map(
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
                  {editedCompany.privateAgreement.emails &&
                    editedCompany.privateAgreement.emails.length > 0 && (
                      <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        E-poster:
                      </h3>
                    )}
                  {editedCompany.privateAgreement.emails &&
                    editedCompany.privateAgreement.emails.map((item, index) => (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          setEditedCompany({
                            ...editedCompany,
                            privateAgreement: {
                              ...editedCompany.privateAgreement,
                              emails:
                                editedCompany.privateAgreement &&
                                editedCompany.privateAgreement.emails
                                  ? editedCompany.privateAgreement.emails.map(
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
                  {editedCompany.privateAgreement.parkingSpots &&
                    editedCompany.privateAgreement.parkingSpots.length > 0 && (
                      <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        Parkeringsplasser:
                      </h3>
                    )}
                  {editedCompany.privateAgreement.parkingSpots &&
                    editedCompany.privateAgreement.parkingSpots.map(
                      (item, index) => (
                        <div key={index} className="mb-4 flex">
                          <input
                            type="text"
                            value={String(item.parkingName)}
                            onChange={(e) =>
                              setEditedCompany({
                                ...editedCompany,
                                privateAgreement: {
                                  ...editedCompany.privateAgreement,
                                  parkingSpots:
                                    editedCompany.privateAgreement &&
                                    editedCompany.privateAgreement.parkingSpots
                                      ? (editedCompany.privateAgreement.parkingSpots.map(
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
                                privateAgreement: {
                                  ...editedCompany.privateAgreement,
                                  parkingSpots:
                                    editedCompany.privateAgreement &&
                                    editedCompany.privateAgreement.parkingSpots
                                      ? (editedCompany.privateAgreement.parkingSpots.map(
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
                    )}
                </>
              )}

              <button
                type="button"
                onClick={handleSaveClick}
                className="bg-blue-500 mt-4 hover:bg-blue-600 text-white py-2 px-4 rounded-md mx-2"
              >
                Lagre
              </button>
              <button
                type="button"
                onClick={handleCancelEditClick}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mx-2"
              >
                Avbryt
              </button>
            </form>
          </>
        )}
      </div>

      {/* History */}
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
              <td className="px-6 py-4">Endret kontaktperson.</td>
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
                bedriften.
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
              <td className="px-6 py-4">Bedriften ble opprettet</td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
