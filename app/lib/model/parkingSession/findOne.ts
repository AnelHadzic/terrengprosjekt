import { ParkingSession } from "."

export async function findParkingSession(licensePlate: string | null) {
  const currentTime = new Date()

  const session = await ParkingSession.findOne({
    licensePlate: { $eq: licensePlate },
    startTime: { $lt: currentTime },
    endTime: { $gt: currentTime },
  })

  return session || null
}
