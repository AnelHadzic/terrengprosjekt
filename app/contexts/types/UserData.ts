import { IParkingSession } from "@/app/lib/interface/IParkingSession"
import { IUser } from "@/app/lib/interface/IUser"
import { Dispatch, SetStateAction } from "react"
import { IUserCompany } from "../interface/CompanyAgreement"
import { UserExistenceAndAgreement } from "@/app/lib/model/company/types/UserExistenceAndAgreement"

export type UserData = {
  userData: IUser | undefined
  setUserData: React.Dispatch<React.SetStateAction<IUser | undefined>>
  agreementStatus: UserExistenceAndAgreement | undefined
  setAgreementStatus: Dispatch<SetStateAction<UserExistenceAndAgreement | undefined>>
  parkingSession: IParkingSession | null | undefined
  setParkingSession: Dispatch<
    SetStateAction<IParkingSession | null | undefined>
  >
  getUserData: () => Promise<void>
  status: "authenticated" | "loading" | "unauthenticated"
  userCompany: IUserCompany | undefined
  getUserCompany: () => Promise<void>
}
