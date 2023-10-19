export type ParkingLot = {
  parkingName: string
  parkingCapacity: number
  parkingCoordinates: number[][]
}

export type ParkingData = {
  // Lagrer liste med parkeringer. GET
  parkingList: ParkingLot[]
  setParkingList: React.Dispatch<React.SetStateAction<ParkingLot[]>>

  // Koordinater
  currentCoordinates: [number, number]
  setCurrentCoordinates: React.Dispatch<React.SetStateAction<[number, number]>>

  // Valgt parkering
  pickedParking: [number, number] | null
  setPickedParking: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >

  // Søk for liste
  search: string | null
  setSearch: React.Dispatch<React.SetStateAction<string | null>>
}
