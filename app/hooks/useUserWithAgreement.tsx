import { useSession } from "next-auth/react"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { ICompany } from "../lib/interface/ICompany"
import { UserWithAgreementStatus } from "../lib/model/user/types/UserWithAgreementStatus"
import { toast } from "react-toastify"
import axios, { HttpStatusCode } from "axios"
import { IUser } from "../lib/interface/IUser"
import UserWithCompanyInfo from "../lib/model/user/types/UserWithCompanyInfo"
import debounce from "../utilities/debounce"

export function useUserWithAgreement() {
    const [currentUserCompany, setCurrentUserCompany] = useState<ICompany>()
    const { data: session } = useSession()
    const [userList, setUserList] = useState<UserWithAgreementStatus[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [newUser, setNewUser] = useState<UserWithAgreementStatus | null>(null)

    const handleAddNewUser = () => {
        const defaultUser: UserWithAgreementStatus = {
          email: "",
          companyInfo: currentUserCompany,
          phone: "",
          primaryCarRegNumber: "",
          status: "NoAgreement",
        }
        setNewUser(defaultUser)
      }
    
      const handleSaveNewUser = async () => {
        if (newUser) {
          let isValidUpdate = true
          switch (newUser.status) {
            case "ListByPrivateAgreement":
              if (newUser.companyInfo?.privateAgreement) {
                if (
                  !newUser.companyInfo?.privateAgreement.emails?.includes(
                    newUser.email,
                  )
                ) {
                  newUser.companyInfo.privateAgreement.emails?.push(newUser.email)
                } else {
                  toast.error("Denne e-posten finnes allerede i whitelist.")
                  isValidUpdate = false
                }
              } else {
                toast.error("Bedriften har ingen privatavtale.")
                isValidUpdate = false
              }
              break
    
            case "ListByCompanyAgreement":
              if (newUser.companyInfo?.companyAgreement) {
                if (
                  !newUser.companyInfo?.companyAgreement.emails?.includes(
                    newUser.email,
                  )
                ) {
                  newUser.companyInfo.companyAgreement.emails?.push(newUser.email)
                } else {
                  toast.error("Denne e-posten finnes allerede i whitelist.")
    
                  isValidUpdate = false
                }
              } else {
                toast.error("Bedriften har ingen bedriftsavtale.")
                isValidUpdate = false
              }
              break
    
            case "NoAgreement":
              break
    
            default:
              isValidUpdate = false
              break
          }
    
          if (isValidUpdate) {
            try {
              if (newUser.status != "NoAgreement") {
                await axios.patch(
                  `/api/company/${newUser.companyInfo?._id}`,
                  newUser.companyInfo,
                )
              }
    
              const correctedUser: IUser = {
                email: newUser.email,
                company: newUser.companyInfo?._id,
                role: 2,
              }
    
              const userResult = await axios.post(`/api/users/`, correctedUser)
              console.log(userResult)
    
              if (userResult.status == HttpStatusCode.Created) {
                setUserList((prevUserList) => [...prevUserList, newUser])
                toast.success(
                  `Brukeren ${newUser.email} har blitt opprettet og lagt i whitelist.`,
                )
                setNewUser(null)
              }
            } catch (error) {
              toast.error("Oppdatering feilet. Kontakt administrator.")
              console.error("Error updating agreement type:", error)
            }
          } else {
            console.error("Invalid update.")
          }
        }
      }
    
      const handleCancelNewUser = () => {
        if (newUser) {
          setNewUser(null)
        }
      }
    
      const getUserData = async () => {
        const response = await fetch(`/api/users/${session?.user?.email}`, {
          method: "GET",
        })
    
        const result = await response.json()
        setCurrentUserCompany(result.data.company as ICompany)
      }
    

    
      const fetchUserStatus = async (email: string) => {
        try {
          const response = await axios.get(`/api/company?email=${email}`)
          return response.data.data.agreementType
        } catch (err) {
          console.error(err)
          return "Error fetching status"
        }
      }
    
      useEffect(() => {
        fetchUsersFromCurrentCompany(setLoading, setError, currentUserCompany, fetchUserStatus, setUserList)
      }, [currentUserCompany, currentUserCompany?._id])
    
      const debouncedFetchDataRef = useRef(
        debounce(async (query: string, company: ICompany) => {
          if (company) {
            try {
              const API_URL = `/api/users?companyId=${company._id}&searchQuery=${query}`
              const response = await axios.get(API_URL)
              const responseUsers = response.data.data as UserWithAgreementStatus[]
    
              const updatedUserList = await Promise.all(
                responseUsers.map(async (user: UserWithCompanyInfo) => {
                  const status = await fetchUserStatus(user.email)
                  return { ...user, status }
                }),
              )
    
              setUserList(updatedUserList)
            } catch (err) {
              console.log(err)
            } finally {
              setLoading(false)
            }
          }
        }, 300),
      )
    
      useEffect(() => {
        setLoading(true)
        setError("")
    
        debouncedFetchDataRef.current(searchQuery, currentUserCompany)
      }, [currentUserCompany, searchQuery])
    
      const handleAgreementTypeChange = async (
        user: UserWithAgreementStatus,
        newAgreementType: string,
      ) => {
        let isValidUpdate = true
        switch (newAgreementType) {
          case "ListByPrivateAgreement":
            if (user.companyInfo?.privateAgreement) {
              if (
                !user.companyInfo?.privateAgreement.emails?.includes(user.email)
              ) {
                user.companyInfo.privateAgreement.emails?.push(user.email)
              } else {
                isValidUpdate = false
              }
            } else {
              toast.error("Bedriften har ingen privatavtale.")
              isValidUpdate = false
            }
            break
    
          case "ListByCompanyAgreement":
            if (user.companyInfo?.companyAgreement) {
              if (
                !user.companyInfo?.companyAgreement.emails?.includes(user.email)
              ) {
                user.companyInfo.companyAgreement.emails?.push(user.email)
              } else {
                isValidUpdate = false
              }
            } else {
              toast.error("Bedriften har ingen bedriftsavtale.")
              isValidUpdate = false
            }
            break
    
          case "NoAgreement":
            // Remove from both whitelists
            if (user.companyInfo?.privateAgreement) {
              if (user.companyInfo?.privateAgreement.emails?.includes(user.email)) {
                user.companyInfo.privateAgreement.emails =
                  user.companyInfo.privateAgreement.emails.filter(
                    (email) => email !== user.email,
                  )
              }
            }
            if (user.companyInfo?.companyAgreement) {
              if (user.companyInfo?.companyAgreement.emails?.includes(user.email)) {
                user.companyInfo.companyAgreement.emails =
                  user.companyInfo.companyAgreement.emails.filter(
                    (email) => email !== user.email,
                  )
              }
            }
            break
    
          default:
            isValidUpdate = false
            break
        }
    
        if (isValidUpdate) {
          try {
            await axios.patch(
              `/api/company/${user.companyInfo?._id}`,
              user.companyInfo,
            )
    
            setUserList((prevUserList) => {
              const updatedUserList = [...prevUserList]
              const userIndex = updatedUserList.findIndex(
                (u) => u.email === user.email,
              )
              updatedUserList[userIndex] = { ...user, status: newAgreementType }
              return updatedUserList
            })
          } catch (error) {
            toast.error("Oppdatering feilet. Kontakt administrator.")
            console.error("Error updating agreement type:", error)
          }
        } else {
          console.error("Invalid update.")
        }
      }

    return {
        currentUserCompany,
        session,
        userList,
        searchQuery,
        loading,
        error,
        newUser,
        handleAddNewUser,
        handleSaveNewUser,
        handleCancelNewUser,
        getUserData,
        handleAgreementTypeChange,
        setSearchQuery,
        setNewUser
    }
}

function fetchUsersFromCurrentCompany(setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }, setError: { (value: SetStateAction<string>): void; (arg0: string): void }, currentUserCompany: ICompany | undefined, fetchUserStatus: (email: string) => Promise<any>, setUserList: { (value: SetStateAction<UserWithAgreementStatus[]>): void; (arg0: { status: any; email: string; firstname?: string | undefined; lastname?: string | undefined; phone?: string | undefined; created?: Date | undefined; token?: string | undefined; role?: number | undefined; companyInfo?: ICompany | undefined; carRegNumbers?: string[] | undefined; primaryCarRegNumber?: string | undefined }[]): void }) {
    setLoading(true)
    setError("")
    const fetchData = async () => {
        try {
            const API_URL = `/api/users?companyId=${currentUserCompany?._id}`
            const response = await axios.get(API_URL)
            const users = response.data.data as UserWithCompanyInfo[]

            const updatedUserList = await Promise.all(
                users.map(async (user: UserWithCompanyInfo) => {
                    const status = await fetchUserStatus(user.email)
                    return { ...user, status }
                })
            )

            setUserList(updatedUserList)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    if (currentUserCompany) {
        fetchData()
    }
}
