"use client"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { UserData } from "./types/UserData"
import { IUser } from "../lib/interface/IUser"
import { IParkingSession } from "../lib/interface/IParkingSession"
import { useSession } from "next-auth/react"
import { IUserCompany } from "./interface/CompanyAgreement"

const UserContext = createContext<UserData | undefined>(undefined)

export const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const { data: session, status } = useSession()

  const [userData, setUserData] = useState<IUser | undefined>(undefined)
  const [parkingSession, setParkingSession] = useState<IParkingSession[]>([])
  const [userCompany, setUserCompany] = useState<IUserCompany | undefined>(
    undefined,
  )

  const getUserCompany = async () => {
    if (!session) {
      return
    }

    try {
      // Making the API call
      const response = await fetch(
        `/api/company?email=${session?.user?.email}`,
        {
          method: "GET",
        },
      )

      const result = (await response.json()) as { data: IUserCompany }

      setUserCompany(result.data)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`, {
      method: "GET",
    })

    const result = (await response.json()) as { data: IUser }
    setUserData(result.data)
    getParkingSession()
    getUserCompany()
  }

  const getParkingSession = async () => {
    const response = await fetch(
      `/api/parkingSession?${userData?.primaryCarRegNumber}`,
      {
        method: "GET",
      },
    )

    const result = (await response.json()) as { data: IParkingSession[] }
    setParkingSession(result.data)
  }

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  const contextValue: UserData = {
    userData,
    setUserData,
    parkingSession,
    setParkingSession,
    getUserData,
    status,
    userCompany,
    getUserCompany,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUserDataContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("UserContext needs a UserProvider")
  }
  return context
}
