import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCompany } from "@/app/hooks/useCompany"

export default function SingleCompany({ companyId }: { companyId: string }) {
  const {
    company,
    isEditing,
    editedCompany,
    handleEditClick,
    handleCancelEditClick,
    fetchCompanyData,
    handleDeleteClick,
    handleSaveClick,
    handleCompanyUpdate,
  } = useCompany(companyId)

  useEffect(() => {
    fetchCompanyData()
  })

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      {/* Details */}
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isEditing ? (
          <>
            <div className="flex mb-6 items-center justify-between">
              <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
                {company?.companyName}
              </h1>
              <button
                onClick={() => handleEditClick()}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Endre
              </button>
            </div>
            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Kontaktperson
            </h2>
            <p className="mb-6">{company?.contactEmail}</p>
            {company?.companyAgreement ? (
              <>
                <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
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
                <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
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
            <p className="mb-6">85</p>
            <h2 className="text-xl mb-1 font-bold leading-none text-gray-900 dark:text-white">
              Intern kommentar
            </h2>
            <p className="mb-6">{company?.internalComment}</p>

            <button
              onClick={() => handleDeleteClick()}
              className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300 hover:underline dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
            >
              Slett bedrift
            </button>
          </>
        ) : (
          // isEdit mode
          <>
            <form>
              {/* Input fields for editing */}
              <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
                Bedriftens navn:
              </h2>
              <input
                type="text"
                value={editedCompany.companyName}
                onChange={(e) =>
                  handleCompanyUpdate({ companyName: e.target.value })
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
                  handleCompanyUpdate({ contactEmail: e.target.value })
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
                  {Array.isArray(editedCompany.companyAgreement.domains) &&
                    editedCompany.companyAgreement.domains.map(
                      (item, index) => (
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updatedDomains = [
                              ...editedCompany.companyAgreement!.domains!,
                            ]
                            updatedDomains[index] = e.target.value
                            handleCompanyUpdate({
                              companyAgreement: {
                                ...editedCompany.companyAgreement,
                                domains: updatedDomains,
                              },
                            })
                          }}
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
                  {Array.isArray(editedCompany.companyAgreement.emails) &&
                    editedCompany.companyAgreement.emails.map((item, index) => (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updatedEmails = [
                            ...editedCompany.companyAgreement!.emails!,
                          ]
                          updatedEmails[index] = e.target.value
                          handleCompanyUpdate({
                            companyAgreement: {
                              ...editedCompany.companyAgreement,
                              emails: updatedEmails,
                            },
                          })
                        }}
                        key={index}
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-4"
                      />
                    ))}
                  {editedCompany.companyAgreement.parkingSpots && (
                    <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                      Parkeringsplasser:
                    </h3>
                  )}
                  {editedCompany.companyAgreement && (
                    <>
                      {Array.isArray(
                        editedCompany.companyAgreement.parkingSpots,
                      ) &&
                        editedCompany.companyAgreement.parkingSpots.map(
                          (item, index) => (
                            <div key={index} className="mb-4 flex">
                              <input
                                type="text"
                                value={String(item.parkingName)}
                                onChange={(e) => {
                                  const updatedParkingSpots = {
                                    ...editedCompany.companyAgreement!
                                      .parkingSpots!,
                                  }
                                  updatedParkingSpots[index] = {
                                    ...item,
                                    parkingName: e.target.value,
                                  }
                                  handleCompanyUpdate({
                                    companyAgreement: {
                                      ...editedCompany.companyAgreement,
                                      parkingSpots: updatedParkingSpots,
                                    },
                                  })
                                }}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                              />
                              <input
                                type="text"
                                value={String(item.parkingLimit)}
                                onChange={(e) => {
                                  const updatedParkingSpots = {
                                    ...editedCompany.companyAgreement!
                                      .parkingSpots!,
                                  }
                                  updatedParkingSpots[index] = {
                                    ...item,
                                    parkingLimit: Number(e.target.value),
                                  }
                                  handleCompanyUpdate({
                                    companyAgreement: {
                                      ...editedCompany.companyAgreement,
                                      parkingSpots: updatedParkingSpots,
                                    },
                                  })
                                }}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                              />
                            </div>
                          ),
                        )}
                    </>
                  )}
                </>
              )}

              {editedCompany.privateAgreement && (
                <>
                  <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
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
                          onChange={(e) => {
                            const updatedDomains = [
                              ...editedCompany.privateAgreement!.domains!,
                            ]
                            updatedDomains[index] = e.target.value
                            handleCompanyUpdate({
                              privateAgreement: {
                                ...editedCompany.privateAgreement,
                                domains: updatedDomains,
                              },
                            })
                          }}
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
                        onChange={(e) => {
                          const updatedEmails = [
                            ...editedCompany.privateAgreement!.emails!,
                          ]
                          updatedEmails[index] = e.target.value
                          handleCompanyUpdate({
                            privateAgreement: {
                              ...editedCompany.privateAgreement,
                              emails: updatedEmails,
                            },
                          })
                        }}
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
                  {editedCompany.privateAgreement && (
                    <>
                      {Array.isArray(
                        editedCompany.privateAgreement.parkingSpots,
                      ) &&
                        editedCompany.privateAgreement.parkingSpots.map(
                          (item, index) => (
                            <div key={index} className="mb-4 flex">
                              <input
                                type="text"
                                value={String(item.parkingName)}
                                onChange={(e) => {
                                  const updatedParkingSpots = {
                                    ...editedCompany.privateAgreement!
                                      .parkingSpots!,
                                  }
                                  updatedParkingSpots[index] = {
                                    ...item,
                                    parkingName: e.target.value,
                                  }
                                  handleCompanyUpdate({
                                    privateAgreement: {
                                      ...editedCompany.privateAgreement,
                                      parkingSpots: updatedParkingSpots,
                                    },
                                  })
                                }}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                              />
                              <input
                                type="text"
                                value={String(item.parkingLimit)}
                                onChange={(e) => {
                                  const updatedParkingSpots = {
                                    ...editedCompany.privateAgreement!
                                      .parkingSpots!,
                                  }
                                  updatedParkingSpots[index] = {
                                    ...item,
                                    parkingLimit: Number(e.target.value),
                                  }
                                  handleCompanyUpdate({
                                    privateAgreement: {
                                      ...editedCompany.privateAgreement,
                                      parkingSpots: updatedParkingSpots,
                                    },
                                  })
                                }}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-2"
                              />
                            </div>
                          ),
                        )}
                    </>
                  )}

                  <h2 className="text-xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
                    Intern kommentar:
                  </h2>
                  <textarea
                    value={editedCompany.internalComment}
                    rows={4}
                    onChange={(e) =>
                      handleCompanyUpdate({ internalComment: e.target.value })
                    }
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                  />
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
