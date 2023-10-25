import { ParkingLot } from "."

export async function getAllParkingLots() {
  try {
    const parkingLots = await ParkingLot.find({}).exec()
    return parkingLots
  } catch (error) {
    throw error
  }
}
