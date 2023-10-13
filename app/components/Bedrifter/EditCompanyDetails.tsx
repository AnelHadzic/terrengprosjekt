import { ICompany } from "@/app/lib/interface/ICompany"

type CompanyDetailsProps = {
  editedCompany: ICompany // Define the type of 'company' based on your data structure
  handleCompanyUpdate?: (updatedProperties: Partial<ICompany>) => void
  handleSaveClick?: () => void
  handleCancelEditClick?: () => void
}

export default function EditCompanyDetails(props: CompanyDetailsProps) {
  const {
    editedCompany,
    handleCompanyUpdate,
    handleSaveClick,
    handleCancelEditClick,
  } = props

  function handleUpdate(updatedProperties: Partial<ICompany>) {
    handleCompanyUpdate?.(updatedProperties)
  }

  function handleSave() {
    handleSaveClick?.()
  }

  function handleCancelEdit() {
    handleCancelEditClick?.()
  }

  return (
    <>
      <form>
        <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
          Bedriftens navn:
        </h2>
        <input
          type="text"
          value={editedCompany.companyName}
          onChange={(e) => handleUpdate({ companyName: e.target.value })}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
        />
        <h2 className="text-xl mb-2 mt-4 font-bold leading-none text-gray-900 dark:text-white">
          Kontaktperson:
        </h2>
        <input
          type="text"
          value={editedCompany.contactEmail}
          onChange={(e) =>
            handleUpdate({ contactEmail: e.target.value })
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
              editedCompany.companyAgreement.domains.map((item, index) => (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedDomains = [
                      ...editedCompany.companyAgreement!.domains!,
                    ]
                    updatedDomains[index] = e.target.value
                    handleUpdate({
                      companyAgreement: {
                        ...editedCompany.companyAgreement,
                        domains: updatedDomains,
                      },
                    })
                  }}
                  key={index}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-4"
                />
              ))}

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
                    handleUpdate({
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
                {Array.isArray(editedCompany.companyAgreement.parkingSpots) &&
                  editedCompany.companyAgreement.parkingSpots.map(
                    (item, index) => (
                      <div key={index} className="mb-4 flex">
                        <input
                          type="text"
                          value={item.parkingName}
                          onChange={(e) => {
                            const updatedParkingSpots = {
                              ...editedCompany.companyAgreement!.parkingSpots!,
                            }
                            updatedParkingSpots[index] = {
                              ...item,
                              parkingName: e.target.value,
                            }
                            handleUpdate({
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
                          value={item.parkingLimit}
                          onChange={(e) => {
                            const updatedParkingSpots = {
                              ...editedCompany.companyAgreement!.parkingSpots!,
                            }
                            updatedParkingSpots[index] = {
                              ...item,
                              parkingLimit: Number(e.target.value),
                            }
                            handleUpdate({
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
              editedCompany.privateAgreement.domains.map((item, index) => (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedDomains = [
                      ...editedCompany.privateAgreement!.domains!,
                    ]
                    updatedDomains[index] = e.target.value
                    handleUpdate({
                      privateAgreement: {
                        ...editedCompany.privateAgreement,
                        domains: updatedDomains,
                      },
                    })
                  }}
                  key={index}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none mb-4"
                />
              ))}

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
                    handleUpdate({
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
                {Array.isArray(editedCompany.privateAgreement.parkingSpots) &&
                  editedCompany.privateAgreement.parkingSpots.map(
                    (item, index) => (
                      <div key={index} className="mb-4 flex">
                        <input
                          type="text"
                          value={item.parkingName}
                          onChange={(e) => {
                            const updatedParkingSpots = {
                              ...editedCompany.privateAgreement!.parkingSpots!,
                            }
                            updatedParkingSpots[index] = {
                              ...item,
                              parkingName: e.target.value,
                            }
                            handleUpdate({
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
                          value={item.parkingLimit}
                          onChange={(e) => {
                            const updatedParkingSpots = {
                              ...editedCompany.privateAgreement!.parkingSpots!,
                            }
                            updatedParkingSpots[index] = {
                              ...item,
                              parkingLimit: Number(e.target.value),
                            }
                            handleUpdate({
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
                handleUpdate({ internalComment: e.target.value })
              }
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
            />
          </>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 mt-4 hover:bg-blue-600 text-white py-2 px-4 rounded-md mx-2"
        >
          Lagre
        </button>

        <button
          type="button"
          onClick={handleCancelEdit}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mx-2"
        >
          Avbryt
        </button>
      </form>
    </>
  )
}
