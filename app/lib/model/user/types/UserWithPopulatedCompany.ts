import { ICompany } from "@/app/lib/interface/ICompany"

type UserWithPopulatedCompany = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  created?: Date
  token?: string
  role?: number
  company?: ICompany
  carRegNumbers?: string[]
  primaryCarRegNumber?: string
}

export default UserWithPopulatedCompany
