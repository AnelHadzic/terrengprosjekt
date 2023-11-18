import { ParkingSession } from "."

export async function getAllParkingSessionsByEmail(userEmail: string) {
  try {
    const parkingSessions = await ParkingSession.find({ userEmail }).exec()
    return parkingSessions
  } catch (error) {
    throw error
  }
}
