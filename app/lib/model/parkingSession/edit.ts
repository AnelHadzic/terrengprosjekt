import { ParkingSession } from "."
import { IParkingSession } from "../../interface/IParkingSession"

export async function editParkingSession(parkingSessionId: string, updatedData: Partial<IParkingSession>) {
    try {
      const existingParkingSession = await ParkingSession.findById(parkingSessionId)
  
      if (!existingParkingSession) {
        throw new Error(`ParkingSession with id ${parkingSessionId} was not found`)
      }
  
      Object.assign(existingParkingSession, updatedData)
  
      await existingParkingSession.save()
  
      return existingParkingSession
    } catch (error) {
      console.error(Error(`Error editing parkingSession: ${error}`))
      return null
    }
  }
  