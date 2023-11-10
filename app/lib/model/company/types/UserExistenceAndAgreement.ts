type UserExistenceAndAgreement = {
  emailExists?: boolean
  agreement: {
    agreementType: string
    parkingSpots?: {
      parkingName: string
      parkingLimit: number
    } | null
  }
}
