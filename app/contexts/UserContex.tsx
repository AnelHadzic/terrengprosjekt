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
  const [parkingSession, setParkingSession] = useState<
    IParkingSession | null | undefined
  >(undefined)
  const [userCompany, setUserCompany] = useState<IUserCompany | undefined>(
    undefined,
  )

  const getUserData = async () => {
    if (!session) {
      return
    }

    try {
      const response = await fetch(`/api/users/${session?.user?.email}`, {
        method: "GET",
      })

      const result = (await response.json()) as { data: IUser }
      setUserData(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getParkingSession = async () => {
    if (!userData) {
      return
    }

    try {
      const response = await fetch(
        `/api/parkingSession/by-email/${userData?.email}`,
        {
          method: "GET",
        },
      )

      const result = (await response.json()) as { data: IParkingSession }
      setParkingSession(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserCompany = async () => {
    if (!session) {
      return
    }

    try {
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

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  useEffect(() => {
    if (userData) {
      getParkingSession()
      getUserCompany()
    }
  }, [userData])

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
