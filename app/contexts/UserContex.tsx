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

const UserContext = createContext<UserData | undefined>(undefined)

export const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const { data: session, status } = useSession()

  const [userData, setUserData] = useState<IUser | undefined>(undefined)
  const [parkingSession, setParkingSession] = useState<IParkingSession[]>([])

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`, {
      method: "GET",
    })

    const result = (await response.json()) as { data: IUser }
    setUserData(result.data)
    getParkingSession()
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
