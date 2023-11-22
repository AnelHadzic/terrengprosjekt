import { IParkingSpot } from "@/app/contexts/interface/CompanyAgreement"

export type UserExistenceAndAgreement = {
  emailExists?: boolean
  agreement: {
    agreementType: string
    shouldPay: boolean
    agreementData?: IParkingSpot[] | null
  }
}
