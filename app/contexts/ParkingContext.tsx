import { ReactNode, createContext, useContext, useState } from "react"
import { ParkingData, ParkingLot } from "./types/ParkingData"

const ParkingContext = createContext<ParkingData | undefined>(undefined)

export const ParkingProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [parkingList, setParkingList] = useState<ParkingLot[]>([])
  const [search, setSearch] = useState<string | null>("")

  // Først setter jeg koordinater i en state. Dette er default koordinater når brukeren laster inn siden.
  // Denne brukes i Map.tsx og i Tabell.tsx
  const [currentCoordinates, setCurrentCoordinates] = useState<
    [number, number]
  >([59.212575443746296, 10.924253141809777])

  // Dette er en state for å hente navn av den parkeringsplassen som ble valgt i listen.
  // Denne brukes i Tabell.tsx og nede i Rediger component.
  const [pickedParking, setPickedParking] = useState<[number, number] | null>(
    null,
  )

  const contextValue: ParkingData = {
    parkingList,
    setParkingList,
    currentCoordinates,
    setCurrentCoordinates,
    pickedParking,
    setPickedParking,
    search,
    setSearch,
  }

  return (
    <ParkingContext.Provider value={contextValue}>
      {children}
    </ParkingContext.Provider>
  )
}

export const useParkingContext = () => {
  const context = useContext(ParkingContext)
  if (!context) {
    throw new Error("ParkingContext needs a ParkingProvider")
  }
  return context
}
