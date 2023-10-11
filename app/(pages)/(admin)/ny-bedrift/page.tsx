"use client"
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo"
import BedriftOppsummering from "@/app/components/nybedrift/BedriftOppsummering"
import BedriftStepper from "@/app/components/nybedrift/BedriftStepper"
import React, { useState } from "react"
import BedriftContext from "@/app/contexts/BedriftContext"
import BedriftsAvtale from "@/app/components/nybedrift/BedriftsAvtale"
import PrivatAvtale from "@/app/components/nybedrift/PrivatAvtale"
import axios from "axios"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  // Stepper State
  const [stepper, setStepper] = useState<number>(1)

  // BEDRIFTS DETALJER SOM SKAL SENDES

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

  const handleSubmit = async () => {
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

  return (
    <>
      <BedriftContext.Provider
        value={{
          stepper,
          setStepper,
          companyName,
          setCompanyName,
          contactPerson,
          setContactPerson,
          privateAgreement,
          setPrivateAgreement,
          privateAgreementType,
          setPrivateAgreementType,
          companyAgreement,
          setCompanyAgreement,
          companyAgreementType,
          setCompanyAgreementType,
          domains,
          setDomains,
          privateWhitelist,
          setPrivateWhitelist,
          companyWhitelist,
          setCompanyWhitelist,
          privateParkings,
          setPrivateParkings,
          companyParkings,
          setCompanyParkings,
        }}
      >
        <main className="flex min-h-screen flex-col items-center">
          <BedriftStepper />
          {stepper === 1 ? <BedriftInfo /> : null}
          {stepper === 2 ? <BedriftsAvtale /> : null}
          {stepper === 3 ? <PrivatAvtale /> : null}
          {stepper === 4 ? <BedriftOppsummering /> : null}
          <div className="flex">
            {stepper > 1 ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={(prev) => setStepper((prev) => prev - 1)}
              >
                Tilbake
              </button>
            ) : null}

            {stepper < 4 ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={(prev) => setStepper((prev) => prev + 1)}
              >
                Neste
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleSubmit()}
              >
                Opprette bedrift
              </button>
            )}
          </div>
          {status ?? status}
          {error ?? error}
        </main>
      </BedriftContext.Provider>
    </>
  )
}

export default Page
