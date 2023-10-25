import { ParkingSession } from "."

export async function findParkingSession(licensePlate: string | null) {
  const session = await ParkingSession.findOne({
    licensePlate: { $eq: licensePlate },
  })

  if (session) {
    return session
  }

  return null
}
