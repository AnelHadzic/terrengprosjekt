import { useCallback, useState } from "react"
import { useSession } from "next-auth/react"
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

export function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<UserWithCompany>()
  const { data: session, status } = useSession()

  const getUserData = useCallback(async () => {
    try {
      if (session) {
        const response = await fetch(`/api/users/${session?.user?.email}`, {
          method: "GET",
        })

        const result = await response.json()
        setLoggedInUser(result.data)
      }
    } catch (err) {
      console.log(err)
    }
  }, [session])

  return { loggedInUser, getUserData }
}
