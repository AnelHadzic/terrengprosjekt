import { ParkingSession } from "."
import { IParkingSession } from "../../interface/IParkingSession"

export async function createParkingSession(parkingSession: IParkingSession) {
  const newEntry = new ParkingSession(parkingSession)
  await newEntry.save()
}
