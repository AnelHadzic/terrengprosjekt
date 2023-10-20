import { IUser } from "@/app/lib/interface/IUser"

type UserDetailsProps = {
  editedUser: IUser // Define the type of 'company' based on your data structure
  handleUserUpdate?: (updatedProperties: Partial<IUser>) => void
  handleSaveClick?: () => void
  handleCancelEditClick?: () => void
}

export default function EditUserDetails(props: UserDetailsProps) {
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

  return (
    <>
      <form>
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
