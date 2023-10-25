import { ParkingSession } from "."

export async function getAllParkingSessions() {
  try {
    const parkingSessions = await ParkingSession.find({}).exec()
    return parkingSessions
  } catch (error) {
    throw error
  }
}
