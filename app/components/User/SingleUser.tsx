import { useUser } from "@/app/hooks/useUser"
import { useEffect } from "react"
import UserDetails from "./UserDetails"
import EditUserDetails from "./EditUserDetails"
import CompanyHistory from "../Bedrifter/CompanyHistory"

export default function SingleUser({ email }: { email: string }) {
  const {
    user,
    isEditing,
    editedUser,
    handleEditClick,
    handleCancelEditClick,
    fetchUserData,
    handleDeleteClick,
    handleSaveClick,
    handleUserUpdate,
  } = useUser(email)

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isEditing ? (
          <UserDetails
            user={user}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <EditUserDetails
            editedUser={editedUser}
            handleUserUpdate={handleUserUpdate}
            handleSaveClick={handleSaveClick}
            handleCancelEditClick={handleCancelEditClick}
          />
        )}
      </div>
      <div className="w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <CompanyHistory />
      </div>
    </div>
  )
}
