import React, { ReactNode, createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

type OnboardingData = {
  stepper: number
  setStepper: React.Dispatch<React.SetStateAction<number>>
  incrementStepper: () => void
  decrementStepper: () => void
  fornavn: string
  setFornavn: React.Dispatch<React.SetStateAction<string>>
  etternavn: string
  setEtternavn: React.Dispatch<React.SetStateAction<string>>
  mobilnummer: number | null
  setMobilnummer: React.Dispatch<React.SetStateAction<number | null>>
  regNumbers: string[]
  setRegNumbers: React.Dispatch<React.SetStateAction<string[]>>
  addInput: (index: number, newValue: string) => void
  removeInput: (regnrIndex: number) => void
  addNewInput: () => void
  handleUpdateUser: () => Promise<void>
  brukerEmail: string | null | undefined
}

const OnboardingContext = createContext<OnboardingData | undefined>(undefined)

export const OnboardingProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [stepper, setStepper] = useState<number>(1)
  const [fornavn, setFornavn] = useState<string>("")
  const [etternavn, setEtternavn] = useState<string>("")
  const [mobilnummer, setMobilnummer] = useState<number | null>(null)
  const [regNumbers, setRegNumbers] = useState([""])

  const { data: session, status } = useSession()

  const brukerEmail = session?.user?.email

  // FUNKSJONER SOM BRUKES

  // STEPPER
  const incrementStepper = () => {
    setStepper((prev) => prev + 1)
  }

  const decrementStepper = () => {
    setStepper((prev) => prev - 1)
  }

  // BILREG NUMMER
  const addInput = (index: number, newValue: string) => {
    const newRegnrs = [...regNumbers]
    newRegnrs[index] = newValue

    setRegNumbers(newRegnrs)
  }

  const removeInput = (regnrIndex: number) => {
    const filterRegnrs = regNumbers.filter((_, index) => index !== regnrIndex)
    setRegNumbers(filterRegnrs)
  }

  const addNewInput = () => {
    setRegNumbers([...regNumbers, ""])
  }

  const router = useRouter()

  const handleUpdateUser = async (): Promise<void> => {
    const payload = {
      firstname: fornavn,
      lastname: etternavn,
      phone: mobilnummer,
      carRegNumbers: regNumbers,
      primaryCarRegNumber: regNumbers[0],
    }
    await fetch(`/api/users/${brukerEmail}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push(`/`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const contextValue: OnboardingData = {
    stepper,
    setStepper,
    incrementStepper,
    decrementStepper,
    fornavn,
    setFornavn,
    etternavn,
    setEtternavn,
    mobilnummer,
    setMobilnummer,
    regNumbers,
    setRegNumbers,
    addInput,
    removeInput,
    addNewInput,
    handleUpdateUser,
    brukerEmail,
  }

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("OnboardingContext needs a OnboardingProvider")
  }
  return context
}
