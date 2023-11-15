import axios from "axios"
import React, { ReactNode, createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { NewCompanyData } from "./types/NewCompanyData"
import { NextResponse } from "next/server"
import { Result } from "../types"
import { ICompany } from "../lib/interface/ICompany"
import { toast } from "react-toastify"
import { ErrorEnum } from "../lib/enum/error-type"

const NewCompanyContext = createContext<NewCompanyData | undefined>(undefined)

export const NewCompanyProvider = (props: { children: ReactNode }) => {
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

    // try {
      
      const response = await fetch(`/api/v2/companies`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.status != 500) {
        const result = await response.json() as Result<ICompany>

        if (result.success) {
          toast.success("Ny bedrift opprettet! Går tilbake til liste straks..")

          await new Promise((resolve) => setTimeout(resolve, 4000))
          router.push("/bedrifter")
        } else {
          if(result.type == ErrorEnum.Duplicate) {
            toast.error("Denne bedriften finnes allerede. Prøv et annet navn.")
          }
          else {
            toast.error("Støtte på en ukjent feil. Kontakt administrator.")
          }
        }
      } else {
        toast.error("Støtte på en feil med sending til server. Prøv igjen eller kontakt administrator.")
      }
    // } catch (error) {
    //   console.log(error)
    //   setError("En feil har oppstått. Prøv igjen eller kontakt administrator.")
    // }
  }

  const contextValue: NewCompanyData = {
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
    setError,
    status,
    setStatus,
  }

  return (
    <NewCompanyContext.Provider value={contextValue}>
      {children}
    </NewCompanyContext.Provider>
  )
}

export const useNewCompanyContext = () => {
  const context = useContext(NewCompanyContext)
  if (!context) {
    throw new Error("NewCompanyContext needs a NewCompanyProvider")
  }
  return context
}
