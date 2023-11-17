import UserWithCompanyInfo from "./UserWithCompanyInfo"

export type UserWithAgreementStatus = UserWithCompanyInfo & {
  status: string
}
