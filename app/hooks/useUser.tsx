import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { IUser } from "../lib/interface/IUser"
import UserWithPopulatedCompany from "../lib/model/user/types/UserWithPopulatedCompany"
import { Result } from "../types"
import { toast } from "react-toastify"

export function useUser(email: string) {
  const router = useRouter()
  const decodedEditedEmail = decodeURIComponent(email)

  const [user, setUser] = useState<UserWithPopulatedCompany | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<IUser>({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: 0,
    company: "",
    carRegNumbers: [""],
    primaryCarRegNumber: "",
  })

  const fetchUserData = useCallback(async () => {
    try {
      const API_URL = `/api/v2/users/${email}`
      const response = await fetch(API_URL, { method: "GET" })
      const result = (await response.json()) as Result<UserWithPopulatedCompany>
      if (result.success) {
        setUser(result.data)
      } else {
        toast.error(`Kunne ikke hente inn brukeren. Error: ${result.error}`)
      }
    } catch (err) {
      toast.error(`Feil i kommunikasjon med server. Error: ${err}`)
      console.log(err)
    }
  }, [email])

  const handleEditClick = () => {
    if (user) {
      setEditedUser({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        role: user.role,
        company: user.company?._id,
        carRegNumbers: user.carRegNumbers,
        primaryCarRegNumber: user.primaryCarRegNumber,
      })
    }
    setIsEditing(true)
  }

  const handleCancelEditClick = () => {
    setEditedUser({
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      role: 0,
      company: "",
      carRegNumbers: [""],
      primaryCarRegNumber: "",
    })
    setIsEditing(false)
  }

  const handleDeleteClick = async () => {
    try {
      const API_URL = `/api/v2/users/${email}`
      const response = await fetch(API_URL, { method: "DELETE" })
      const result = (await response.json()) as Result<IUser>
      if (result.success) {
        toast.success(`Slettet brukeren med e-post "${result.data.email}"`)
        router.push("/brukere")
      } else {
        toast.error(`Kunne ikke slette brukeren. Error: ${result.error}`)
      }
    } catch (err) {
      toast.error(`Feil i kommunikasjon med server. Error: ${err}`)
      console.log(err)
    }
  }

  const handleSaveClick = async () => {
    try {
      const API_URL = `/api/v2/users/${email}`
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(editedUser),
      })
      const result = (await response.json()) as Result<IUser>
      if (result.success) {
        toast.success("Endringene ble lagret.")
        setIsEditing(false)

        if (decodedEditedEmail === editedUser.email) {
          fetchUserData()
        } else {
          router.push(`/brukere/${editedUser.email}`)
        }
      } else {
        toast.error(`Kunne ikke lagre dine endringer. ${result.error}`)
      }
    } catch (err) {
      toast.error(`Feil i kommunikasjon med server. Error: ${err}`)
      console.log(err)
    }
  }

  const handleUserUpdate = (updatedProperties: Partial<IUser>) => {
    setEditedUser({
      ...editedUser,
      ...updatedProperties,
    })
  }

  return {
    user,
    isEditing,
    editedUser,
    handleEditClick,
    handleCancelEditClick,
    fetchUserData,
    handleDeleteClick,
    handleSaveClick,
    handleUserUpdate,
  }
}
