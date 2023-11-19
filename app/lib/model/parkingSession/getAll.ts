import { ParkingSession } from "."

export async function getAllParkingSessions() {
  try {
    const parkingSessions = await ParkingSession.find({}).exec()
    return parkingSessions
  } catch (error) {
    throw error
  }
}

export async function getAllParkingSessionsByEmail(userEmail: string) {
  try {
    const parkingSessions = await ParkingSession.find({ userEmail })
      .sort({ startTime: -1 })
      .exec()

    return parkingSessions
  } catch (error) {
    throw error
  }
}
