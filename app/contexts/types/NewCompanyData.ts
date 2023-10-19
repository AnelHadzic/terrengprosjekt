export type NewCompanyData = {
  stepper: number
  setStepper: React.Dispatch<React.SetStateAction<number>>
  incrementStepper: () => void
  decrementStepper: () => void
  companyName: string
  setCompanyName: React.Dispatch<React.SetStateAction<string>>
  contactPerson: string
  setContactPerson: React.Dispatch<React.SetStateAction<string>>

  //3
  privateAgreement: boolean
  setPrivateAgreement: React.Dispatch<React.SetStateAction<boolean>>
  privateAgreementType: string
  setPrivateAgreementType: React.Dispatch<React.SetStateAction<string>>
  companyAgreement: boolean
  setCompanyAgreement: React.Dispatch<React.SetStateAction<boolean>>
  companyAgreementType: string
  setCompanyAgreementType: React.Dispatch<React.SetStateAction<string>>

  // Privat Avtale : 3
  privateWhitelist: string[]
  setPrivateWhitelist: React.Dispatch<React.SetStateAction<string[]>>
  privateParkings: {
    parkingName: string
    parkingLimit: number
  }[]
  setPrivateParkings: React.Dispatch<
    React.SetStateAction<
      {
        parkingName: string
        parkingLimit: number
      }[]
    >
  >

  // Bedrifts Avtale : 4
  domains: string[]
  setDomains: React.Dispatch<React.SetStateAction<string[]>>
  companyWhitelist: string[]
  setCompanyWhitelist: React.Dispatch<React.SetStateAction<string[]>>
  companyParkings: {
    parkingName: string
    parkingLimit: number
  }[]
  setCompanyParkings: React.Dispatch<
    React.SetStateAction<
      {
        parkingName: string
        parkingLimit: number
      }[]
    >
  >
  handleSubmit: () => Promise<void>
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}
