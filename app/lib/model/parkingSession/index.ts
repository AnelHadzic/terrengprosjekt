import mongoose, { Schema } from "mongoose"
import { IParkingSession } from "../../interface/IParkingSession"
export { findParkingSessionByRegNr, findParkingSessionByEmail } from "./findOne"
export { createParkingSession } from "./create"
export { getAllParkingSessions } from "./getAll"
export { deleteParkingSession } from "./delete"
export { editParkingSession } from "./edit"

const parkingSessionSchema = new Schema({
  parkingName: String,
  startTime: Date,
  endTime: Date,
  userEmail: String,
  licensePlate: String,
})

export const ParkingSession =
  mongoose.models.ParkingSession ||
  mongoose.model<IParkingSession>("ParkingSession", parkingSessionSchema)
