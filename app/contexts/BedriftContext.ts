import axios from "axios"
import React, { ReactNode, createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

type BedriftsData = {
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

const BedriftsContext = createContext<BedriftsData | undefined>(undefined)

export const BedriftsProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [stepper, setStepper] = useState<number>(1)

  // STEPPER
  const incrementStepper = () => {
    setStepper((prev) => prev + 1)
  }

  const decrementStepper = () => {
    setStepper((prev) => prev - 1)
  }

  // SIDE 1
  const [companyName, setCompanyName] = useState<string>("")
  const [contactPerson, setContactPerson] = useState<string>("")

  // SIDE2
  const [privateAgreement, setPrivateAgreement] = useState<boolean>(false)
  const [companyAgreement, setCompanyAgreement] = useState<boolean>(false)
  const [privateAgreementType, setPrivateAgreementType] = useState<string>("")
  const [companyAgreementType, setCompanyAgreementType] = useState<string>("")

  // SIDE 3
  const [privateWhitelist, setPrivateWhitelist] = useState<string[]>([""])
  const [privateParkings, setPrivateParkings] = useState<
    Array<{ parkingName: string; parkingLimit: number }>
  >([])

  // SIDE 4
  const [domains, setDomains] = useState<string[]>([""])
  const [companyWhitelist, setCompanyWhitelist] = useState<string[]>([""])
  const [companyParkings, setCompanyParkings] = useState<
    Array<{ parkingName: string; parkingLimit: number }>
  >([])

  // HANDLE SUBMIT TO USE API
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const router = useRouter()

  const handleSubmit = async (): Promise<void> => {
    const payload = {
      companyName: companyName,
      contactEmail: contactPerson,
      privateAgreement: privateAgreement
        ? {
            domains: privateAgreementType === "Domain" ? domains : undefined,
            emails:
              privateAgreementType === "Whitelist"
                ? privateWhitelist
                : undefined,
            parkingSpots: privateParkings,
          }
        : undefined,
      companyAgreement: companyAgreement
        ? {
            domains: companyAgreementType === "Domain" ? domains : undefined,
            emails:
              companyAgreementType === "Whitelist"
                ? companyWhitelist
                : undefined,
            parkingSpots: companyParkings,
          }
        : undefined,
      internalComment: "string",
    }
    console.log(JSON.stringify(payload))

    try {
      const response = await axios.post(
        "http://localhost:3000/api/company",
        payload,
      )
      setStatus("Bedrift er nå lagt inn")
      router.push("/bedrifter")
    } catch (error) {
      setError("Noe gikk galt")
    }
  }

  const contextValue: BedriftsData = {
    stepper,
    setStepper,
    incrementStepper,
    decrementStepper,
    companyName,
    setCompanyName,
    contactPerson,
    setContactPerson,
    privateAgreement,
    setPrivateAgreement,
    companyAgreement,
    setCompanyAgreement,
    privateAgreementType,
    setPrivateAgreementType,
    companyAgreementType,
    setCompanyAgreementType,
    privateWhitelist,
    setPrivateWhitelist,
    privateParkings,
    setPrivateParkings,
    domains,
    setDomains,
    companyWhitelist,
    setCompanyWhitelist,
    companyParkings,
    setCompanyParkings,
    handleSubmit,
    error,
    status,
  }

  return (
    <BedriftsContext.Provider value={contextValue}>
      {children}
    </BedriftsContext.Provider>
  )
}

export const useBedriftsContext = () => {
  const context = useContext(BedriftsContext)
  if (!context) {
    throw new Error("BedriftsContext needs a BedriftsProvider")
  }
  return context
}
