import { ICompany } from "@/app/lib/interface/ICompany"
import displayUserRole from "./user-util"

type CompanyDetailsProps = {
  user:
    | {
        email: string
        firstname?: string
        lastname?: string
        phone?: string
        created?: Date
        token?: string
        role?: number
        company?: ICompany
        carRegNumbers?: string[]
        primaryCarRegNumber?: string
      }
    | undefined
  handleEditClick?: () => void
  handleDeleteClick?: () => void
}

export default function UserDetails(props: CompanyDetailsProps) {
  const { user, handleEditClick, handleDeleteClick } = props

  function handleEdit() {
    handleEditClick?.()
  }

  function handleDelete() {
    handleDeleteClick?.()
  }

  return (
    <>
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          {user?.firstname + " " + user?.lastname}
        </h1>
        <button
          onClick={() => handleEdit()}
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
        Mobilnummer
      </h2>
      <p className="mb-6">{user?.phone}</p>
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Rolle
      </h2>
      <p className="mb-6">
          <>
            {displayUserRole(user?.role)}
          </>
      </p>

      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Bedrift
      </h2>
      <p className="mb-6">{user?.company?.companyName}</p>

      <div className="flex items-center justify-between">
        <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
          Primærbil
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Se alle
        </a>
      </div>
      <p className="mb-6">{user?.primaryCarRegNumber}</p>
      <button
        onClick={() => handleDelete()}
        className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300 hover:underline dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
      >
        Slett bruker
      </button>
    </>
  )
}
