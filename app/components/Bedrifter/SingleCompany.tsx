import { useEffect, useState } from "react"
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

  const [isHistoryOpen, setIsHistoryOpen] = useState(true)

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  return (
    <div className="w-full p-6 mt-6 pb-12 flex items-start">
      {/* Details */}
      <div
        className={`w-${
          isHistoryOpen ? "2/6" : "5/6"
        }  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all duration-300`}
      >
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
      {isHistoryOpen && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={toggleHistory}
            className="mb-4 text-sm font-medium text-blue-600 focus:outline-none"
          >
            Hide History
          </button>
          <CompanyHistory />
        </div>
      )}
      {!isHistoryOpen && (
        <button
          onClick={toggleHistory}
          className="fixed top-20 right-4 z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 text-sm font-medium text-blue-600 focus:outline-none"
        >
          Show History
        </button>
      )}
    </div>
  )
}
