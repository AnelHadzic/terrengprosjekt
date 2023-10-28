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
    <>
      <MyCompanyOverview loggedInUser={loggedInUser}></MyCompanyOverview>
      
      <CMUserList></CMUserList>
    </>
  )
}
