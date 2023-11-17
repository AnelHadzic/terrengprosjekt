import axios from "axios"
import { ICompany } from "@/app/lib/interface/ICompany"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Result } from "../types"
import { toast } from "react-toastify"

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

  const fetchCompanyData = useCallback(async () => {
    try {
      const API_URL = `/api/v2/companies/${companyId}`
      const response = await fetch(API_URL, { method: "GET" })
      const result = (await response.json()) as Result<ICompany>
      if (result.success) {
        setCompany(result.data)
      }
      // const API_URL = `/api/v2/companies/${companyId}`
      // const response = await axios.get(API_URL)
      // setCompany(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }, [companyId])

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
    console.log("test")
    try {
      const API_URL = `/api/v2/companies/${companyId}`
      //await axios.delete(API_URL)
      const response = await fetch(API_URL, { method: "DELETE" })
      const result = (await response.json()) as Result<ICompany>
      if (result.success) {
        toast.success(`Bedriften "${result.data.companyName}" ble slettet.`)
        router.push("/bedrifter")
      } else {
        toast.error(`Kunne ikke slette bedriften. Error: "${result.error}" `)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveClick = async () => {
    try {
      const API_URL = `/api/v2/companies/${companyId}`
      // await axios.patch(API_URL, editedCompany)
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(editedCompany),
      })
      const result = await response.json() as Result<ICompany>

      if (result.success) {
        toast.success("Endringen ble lagret.")
        setIsEditing(false)
        fetchCompanyData()
      }
      else {
        toast.error(`Kunne ikke lagre endringene. Error: ${result.error}`)
      }

      
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
