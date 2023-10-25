import { ParkingLot } from "."
import { IParkingLot } from "../../interface/IParkingLot"

export async function createParkingLot(parkingLot: IParkingLot) {
  const newEntry = new ParkingLot(parkingLot)
  await newEntry.save()
}
