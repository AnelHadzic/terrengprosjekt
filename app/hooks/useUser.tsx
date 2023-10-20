import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { IUser } from "../lib/interface/IUser"

export function useUser(email: string) {
  const router = useRouter()

  const [user, setUser] = useState<IUser | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<IUser>({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: 0,
    companyId: "",
    carRegNumbers: [""],
    primaryCarRegNumber: ""
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
        setEditedUser(user)
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
        companyId: "",
        carRegNumbers: [""],
        primaryCarRegNumber: ""
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
      fetchUserData
() // Fetch the updated data after saving
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
