import { ParkingLot } from "."

export async function findParkingLot(parkingName: string | null) {
  const session = await ParkingLot.findOne({
    parkingName: { $eq: parkingName },
  })

  if (session) {
    return session
  }

  return null
}
