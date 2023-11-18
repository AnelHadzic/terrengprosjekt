import { ParkingSession } from "."

export async function findParkingSessionByRegNr(regNr: string | null) {
  const currentTime = new Date()

  const session = await ParkingSession.findOne({
    licensePlate: { $eq: regNr },
    startTime: { $lt: currentTime },
    endTime: { $gt: currentTime },
  })

  return session || null
}

export async function findParkingSessionByEmail(userEmail: string | null) {
  const currentTime = new Date()

  const session = await ParkingSession.findOne({
    userEmail: { $eq: userEmail },
    startTime: { $lt: currentTime },
    endTime: { $gt: currentTime },
  })

  return session || null
}
