import { useEffect } from "react"
import { useCompany } from "@/app/hooks/useCompany"
import CompanyDetails from "./CompanyDetails"
import EditCompanyDetails from "./EditCompanyDetails"
import CompanyHistory from "./CompanyHistory"

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
  }, [fetchCompanyData])

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      {/* Details */}
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isEditing ? (
          <CompanyDetails
            company={company}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          // isEdit mode

          <EditCompanyDetails
            editedCompany={editedCompany}
            handleCompanyUpdate={handleCompanyUpdate}
            handleSaveClick={handleSaveClick}
            handleCancelEditClick={handleCancelEditClick}
          />
        )}
      </div>

      {/* History */}
      <div className="w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <CompanyHistory />
      </div>
    </div>
  )
}
