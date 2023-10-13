import axios from "axios"
import { ICompany } from "@/app/lib/interface/ICompany"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Custom hook to manage company data and editing state
export function useCompany(companyId: string) {
  const router = useRouter()

  const [company, setCompany] = useState<ICompany | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [editedCompany, setEditedCompany] = useState<ICompany>({
    companyName: "",
    contactEmail: "",
    companyAgreement: {},
    privateAgreement: {},
    internalComment: "",
  })

  const fetchCompanyData = async () => {
    try {
      const API_URL = `http://localhost:3000/api/company/${companyId}`
      const response = await axios.get(API_URL)
      setCompany(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditClick = () => {
    if (company) {
      setEditedCompany(company)
    }
    setIsEditing(true)
  }

  const handleCancelEditClick = () => {
    // Reset editedCompany to the original company data
    setEditedCompany({
      companyName: "",
      contactEmail: "",
      companyAgreement: {},
      privateAgreement: {},
    })
    setIsEditing(false)
  }

  const handleDeleteClick = async () => {
    try {
      const API_URL = `http://localhost:3000/api/company/${companyId}`
      await axios.delete(API_URL)
      router.push("/bedrifter")
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveClick = async () => {
    try {
      const API_URL = `http://localhost:3000/api/company/${companyId}`
      await axios.patch(API_URL, editedCompany)
      setIsEditing(false)
      fetchCompanyData() // Fetch the updated data after saving
    } catch (err) {
      console.log(err)
    }
  }

  const handleCompanyUpdate = (updatedProperties: Partial<ICompany>) => {
    setEditedCompany({
      ...editedCompany,
      ...updatedProperties,
    })
  }

  return {
    company,
    isEditing,
    editedCompany,
    handleEditClick,
    handleCancelEditClick,
    fetchCompanyData,
    handleDeleteClick,
    handleSaveClick,
    handleCompanyUpdate,
  }
}
