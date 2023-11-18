import { IParkingSession } from "@/app/lib/interface/IParkingSession"
import { IUser } from "@/app/lib/interface/IUser"
import { Dispatch, SetStateAction } from "react"
import { IUserCompany } from "../interface/CompanyAgreement"

export type UserData = {
  userData: IUser | undefined
  setUserData: React.Dispatch<React.SetStateAction<IUser | undefined>>
  parkingSession: IParkingSession | null | undefined
  setParkingSession: Dispatch<
    SetStateAction<IParkingSession | null | undefined>
  >
  getUserData: () => Promise<void>
  status: "authenticated" | "loading" | "unauthenticated"
  userCompany: IUserCompany | undefined
  getUserCompany: () => Promise<void>
}
