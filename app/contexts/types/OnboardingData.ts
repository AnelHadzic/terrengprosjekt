export type OnboardingData = {
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
