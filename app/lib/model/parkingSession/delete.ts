import { ParkingSession } from "."

export async function deleteParkingSession(parkingSessionId: string) {
  try {
    const deletedParkingSession = await ParkingSession.findByIdAndRemove(
      parkingSessionId,
    )

    if (!deletedParkingSession) {
      throw new Error("ParkingSession not found")
    }

    return deletedParkingSession
  } catch (error) {
    throw new Error(`Error deleting parkingsession: ${error}`)
  }
}
