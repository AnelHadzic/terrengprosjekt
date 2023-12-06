import Papa from "papaparse"
import { useUserWithAgreement } from "@/app/hooks/useUserWithAgreement"
import { Fragment, useEffect } from "react"
import { newUserTableRow } from "./newUserTableRow"
import { newUserActions } from "./newUserActions"
import { userTableHeaders } from "./userTableHeaders"
import { userRow } from "./userRow"
import { IUser } from "@/app/lib/interface/IUser"
import { Result } from "@/app/types"
import { toast } from "react-toastify"

export default function UserList() {
  const {
    session,
    userList,
    searchQuery,
    loading,
    error,
    newUser,
    getUserData,
    handleAddNewUser,
    handleAgreementTypeChange,
    handleCancelNewUser,
    handleSaveNewUser,
    setSearchQuery,
    setNewUser,
    handleFileUpload
  } = useUserWithAgreement()

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  

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
          {userTableHeaders()}

          <tbody>
            {userList.map((item, index) => (
              <Fragment key={index}>
                {userRow(item, handleAgreementTypeChange)}
              </Fragment>
            ))}

            {newUser && newUserTableRow(newUser, setNewUser)}

            {newUserActions(
              newUser,
              handleSaveNewUser,
              handleCancelNewUser,
              handleAddNewUser,
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center">
        <label
          htmlFor="csvFile"
          className="flex items-center p-2 border mt-6 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none active:bg-gray-200 cursor-pointer"
        >
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
        </label>
        <input
          type="file"
          id="csvFile"
          name="csvFile"
          accept=".csv" // Allow only CSV files
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </>
  )
}
