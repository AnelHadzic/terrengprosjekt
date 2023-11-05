import { useCallback, useState } from "react"
import { useSession } from "next-auth/react"
import UserWithPopulatedCompany from "../lib/model/user/types/UserWithPopulatedCompany"

export function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<UserWithPopulatedCompany>()
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
