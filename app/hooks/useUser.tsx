import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { IUser } from "../lib/interface/IUser"
import { ICompany } from "../lib/interface/ICompany"

type UserWithCompany = {
  email: string,
  firstname?: string,
  lastname?: string,
  phone?: string,
  created?: Date,
  token?: string,
  role?: number,
  company?: ICompany,
  carRegNumbers?: string[],
  primaryCarRegNumber?: string
}

export function useUser(email: string) {
  const router = useRouter()
  const decodedEditedEmail = decodeURIComponent(email);

  const [user, setUser] = useState<UserWithCompany | undefined>()
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
      const API_URL = `/api/users/${email}`
      const response = await axios.get(API_URL)
      setUser(response.data.data)
    } catch (err) {
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
    console.log("test")
    try {
      const API_URL = `/api/users/${email}`
      await axios.delete(API_URL)
      router.push("/bedrifter")
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveClick = async () => {
    try {
      const API_URL = `/api/users/${email}`
      await axios.patch(API_URL, editedUser)
      setIsEditing(false)

      if (decodedEditedEmail === editedUser.email) {
        fetchUserData()
      } else {
        router.push(`/brukere/${editedUser.email}`)
      }
    } catch (err) {
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
