import { useLoggedInUser } from "@/app/hooks/useLoggedInUser"
import CMUserList from "./CMUserList"
import MyCompanyOverview from "./MyCompanyOverview"
import { useEffect } from "react"

export default function MyCompany() {
  const { loggedInUser, getUserData } = useLoggedInUser()

  useEffect(() => {
    getUserData()
  }, [getUserData, loggedInUser?.email])
  return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full">
        <MyCompanyOverview loggedInUser={loggedInUser}></MyCompanyOverview>

        <CMUserList></CMUserList>
    </div>
  )
}
