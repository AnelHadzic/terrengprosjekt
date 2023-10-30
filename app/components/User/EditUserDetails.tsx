import { RoleEnum, Roles } from "@/app/lib/enum/role-type"
import { ICompany } from "@/app/lib/interface/ICompany"
import { IUser } from "@/app/lib/interface/IUser"
import React, { useCallback, useEffect } from "react"
import { useState } from "react"

type UserDetailsProps = {
  editedUser: IUser
  handleUserUpdate?: (updatedProperties: Partial<IUser>) => void
  handleSaveClick?: () => void
  handleCancelEditClick?: () => void
}

export default function EditUserDetails(props: UserDetailsProps) {
  const [companySuggestions, setCompanySuggestions] = useState<ICompany[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const {
    editedUser,
    handleUserUpdate,
    handleSaveClick,
    handleCancelEditClick,
  } = props

  function handleUpdate(updatedProperties: Partial<IUser>) {
    handleUserUpdate?.(updatedProperties)
  }

  function handleSave() {
    handleSaveClick?.()
  }

  function handleCancelEdit() {
    handleCancelEditClick?.()
  }

  const selectCompany = (selectedCompany: ICompany) => {
    if (selectedCompany._id) {
      //setCompanyId(selectedCompany._id)
      handleUpdate({ company: selectedCompany._id })
      setSearchTerm(selectedCompany.companyName)
    }
    setCompanySuggestions([]) // Clear suggestions after selecting a company
  }

  const addInput = (index: number, newValue: string) => {
    if (editedUser.carRegNumbers) {
      const newRegnrs = [...editedUser.carRegNumbers]
      newRegnrs[index] = newValue

      handleUpdate({ carRegNumbers: newRegnrs })
    }
  }

  const removeInput = (regnrIndex: number) => {
    if (editedUser.carRegNumbers) {
      const filterRegnrs = editedUser.carRegNumbers.filter(
        (_, index) => index !== regnrIndex,
      )
      handleUpdate({ carRegNumbers: filterRegnrs })
    }
  }

  const addNewInput = () => {
    // setRegNumbers([...regNumbers, ""])
    if (editedUser.carRegNumbers) {
      const newRegnrs = [...editedUser.carRegNumbers]
      newRegnrs.push("")

      handleUpdate({ carRegNumbers: newRegnrs })
    }
  }

  const handleCompanySearch = useCallback(async () => {
    try {
      const response = await fetch(`/api/company?companyName=${searchTerm}`)
      if (response.status === 200) {
        const data = await response.json()
        if (Array.isArray(data.data)) {
          const resultCompanies = data.data as ICompany[]
          setCompanySuggestions(resultCompanies)
        } else {
          console.error(
            "API response does not contain an array of company data",
          )
        }
      } else {
        console.error("API request failed with status: " + response.status)
      }
    } catch (error) {
      console.error(error)
    }
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm) {
      handleCompanySearch()
      console.log("SOMEBODY TYPETH")
    } else {
      setCompanySuggestions([])
    }
  }, [handleCompanySearch, searchTerm])

  const getCurrentCompany = useCallback(async () => {
    try {
      const response = await fetch(`/api/company/${editedUser.company}`)
      if (response.status === 200) {
        const data = await response.json()
        if (data.data) {
          const resultCompany = data.data as ICompany
          setSearchTerm(resultCompany.companyName)
        } else {
          console.error("API response does not contain expected company data")
        }
      } else {
        console.error("API request failed with status: " + response.status)
      }
    } catch (error) {
      console.error(error)
    }
  }, [editedUser.company])

  useEffect(() => {
    getCurrentCompany()
  }, [getCurrentCompany])

  return (
    <>
      <form>
        <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
          Fornavn:
        </h2>
        <input
          type="text"
          value={editedUser.firstname}
          onChange={(e) => handleUpdate({ firstname: e.target.value })}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
        />

        <h2 className="text-xl mb-2 mt-6 font-bold leading-none text-gray-900 dark:text-white">
          Etternavn:
        </h2>
        <input
          type="text"
          value={editedUser.lastname}
          onChange={(e) => handleUpdate({ lastname: e.target.value })}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
        />

        <h2 className="text-xl mb-2 mt-6 font-bold leading-none text-gray-900 dark:text-white">
          E-post:
        </h2>
        <input
          type="text"
          value={editedUser.email}
          onChange={(e) => handleUpdate({ email: e.target.value })}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
        />

        <h2 className="text-xl mb-2 mt-6 font-bold leading-none text-gray-900 dark:text-white">
          Mobilnummer:
        </h2>
        <input
          type="text"
          value={editedUser.phone}
          onChange={(e) => handleUpdate({ phone: e.target.value })}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
        />

        <div className="mb-4 mt-6">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Bedrift
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <ul className="mt-2">
            {companySuggestions?.map((company) => (
              <li
                key={company._id}
                onClick={() => selectCompany(company)}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                {company.companyName}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 mt-6">
          <label
            htmlFor="regNumbers"
            className="block text-sm font-medium text-gray-700"
          >
            Registreringsnummer
          </label>
          {editedUser.carRegNumbers?.map((regnr, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-row ...">
                <input
                  type="text"
                  placeholder="AE12345"
                  value={regnr}
                  onChange={(e) => addInput(index, e.target.value)}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
                <div className="mr-6"></div>
                {index > 0 ? (
                  <svg
                    className="w-6 h-6 text-red-500 dark:text-white hover:text-red-800 cursor-pointer ..."
                    onClick={() => removeInput(index)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                    />
                  </svg>
                ) : (
                  <div className="group relative flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <g fill="none">
                        <path
                          fill="yellow"
                          d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z"
                          opacity=".16"
                        />
                        <path
                          stroke="yellow"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z"
                        />
                      </g>
                    </svg>
                    <div className="hidden group-hover:block bg-yellow-400 text-white text-xs p-1 rounded-md ml-2">
                      Primærbil
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-6"></div>
            </React.Fragment>
          ))}
          <div className="flex flex-row-reverse ...">
            <button
              type="button"
              onClick={addNewInput}
              className="py-2.5 flex px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <div className="">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-4 mt-6">
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-700"
          >
            Rolle
          </label>
          <select
            id="roleId"
            name="roleId"
            value={editedUser.role}
            onChange={(e) => handleUpdate({ role: Number(e.target.value) })}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            {Roles.map((role) => (
              <option key={role} value={role}>
                {RoleEnum[role] === "Admin" ? "Administrator" : null}
                {RoleEnum[role] === "Customer" ? "Kunde" : null}
                {RoleEnum[role] === "Inspector" ? "Inspektøy" : null}
                {RoleEnum[role] === "CompanyManager"
                  ? "Bedriftansvarlig"
                  : null}
              </option>
            ))}
          </select>
        </div>

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
