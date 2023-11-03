import mongoose, { Schema } from "mongoose"
import { IParkingLot } from "../../interface/IParkingLot"
export { createParkingLot } from "./create"
export { getAllParkingLots } from "./getAll"
export { findParkingLot } from "./findOne"

const parkingLotSchema = new Schema({
  parkingName: {
    type: String,
    unique: true,
  },
  parkingCapacity: Number,
  parkingCoordinates: [[Number]],
  parkingControl: String,
  created: { type: Date, default: Date.now },
})

export const ParkingLot =
  mongoose.models.ParkingLot ||
  mongoose.model<IParkingLot>("ParkingLot", parkingLotSchema)
