import { RoleEnum, Roles } from "@/app/lib/enum/role-type"
import { ICompany } from "@/app/lib/interface/ICompany"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect } from "react"
import { useState } from "react"

export default function NewUser() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [regNumbers, setRegNumbers] = useState([""])
  const [roleId, setRoleId] = useState("2")
  const [companySuggestions, setCompanySuggestions] = useState<ICompany[]>()
  const [searchTerm, setSearchTerm] = useState("")

  const router = useRouter()

  const addInput = (index: number, newValue: string) => {
    const newRegnrs = [...regNumbers]
    newRegnrs[index] = newValue

    setRegNumbers(newRegnrs)
  }

  const removeInput = (regnrIndex: number) => {
    const filterRegnrs = regNumbers.filter((_, index) => index !== regnrIndex)
    setRegNumbers(filterRegnrs)
  }

  const addNewInput = () => {
    setRegNumbers([...regNumbers, ""])
  }

  const handleCreateUser = async () => {
    const payload = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      companyId: companyId,
      type: roleId,
      carRegNumbers: regNumbers,
      primaryCarRegNumber: regNumbers[0],
    }
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push(`/brukere/${data.data.email}`)
      })
      .catch((error) => {
        console.error(error)
      })
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

  // Function to set the selected company
  const selectCompany = (selectedCompany: ICompany) => {
    if (selectedCompany._id) {
      setCompanyId(selectedCompany._id)
      setSearchTerm(selectedCompany.companyName)
    }
    setCompanySuggestions([]) // Clear suggestions after selecting a company
  }

  return (
    <div className="max-w-sm px-16 py-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Lag en ny bruker</h1>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-post
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Fornavn
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Etternavn
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Mobilnummer
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="companyId"
          className="block text-sm font-medium text-gray-700"
        >
          Bedrift
        </label>
        <input
          type="text"
          id="companyId"
          name="companyId"
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

      <div className="mb-4">
        <label
          htmlFor="regNumbers"
          className="block text-sm font-medium text-gray-700"
        >
          Registreringsnummer
        </label>
        {regNumbers.map((regnr, index) => (
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

      <div className="mb-4">
        <label
          htmlFor="roleId"
          className="block text-sm font-medium text-gray-700"
        >
          Rolle
        </label>
        <select
          id="roleId"
          name="roleId"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        >
          {Roles.map((role) => (
            <option key={role} value={role}>
              {RoleEnum[role] === "Admin" ? "Administrator" : null}
              {RoleEnum[role] === "Customer" ? "Kunde" : null}
              {RoleEnum[role] === "Inspector" ? "Inspektøy" : null}
              {RoleEnum[role] === "CompanyAdmin"
                ? "Bedriftsadministrator"
                : null}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Opprett bruker
        </button>
      </div>
    </div>
  )
}
