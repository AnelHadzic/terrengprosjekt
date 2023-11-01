export interface IParkingSpot {
  parkingName: string
  parkingLimit: number
  _id: string
}

export interface IUserCompany {
  agreementType: string
  agreementData?: IParkingSpot[]
}

export interface IUserAgreement {
  emailExists: boolean
  data?: IUserCompany
}
