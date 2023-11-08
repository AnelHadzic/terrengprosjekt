import { ICompany } from "../../../interface/ICompany"

type UserWithCompanyInfo = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  created?: Date
  token?: string
  role?: number
  companyInfo?: ICompany
  carRegNumbers?: string[]
  primaryCarRegNumber?: string
}

export default UserWithCompanyInfo
