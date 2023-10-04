import mongoose, { Schema } from "mongoose";
import { IParkingLot } from "../interface/IParkingLot";

const parkingLotSchema = new Schema({
  parkingName: {
    type: String,
    unique: true,
  },
  parkingCapacity: String,
  created: { type: Date, default: Date.now },
});

export const ParkingLot = mongoose.model<IParkingLot>(
  "ParkingLot",
  parkingLotSchema
);

export async function findParkingLot(parkingName: string | null) {
  const session = await ParkingLot.findOne({
    parkingName: { $eq: parkingName },
  });

  if (session) {
    return session;
  }

  return null;
}

export async function getAllParkingLots() {
  try {
    const parkingLots = await ParkingLot.find({}).exec();
    return parkingLots;
  } catch (error) {
    throw error;
  }
}

export async function createParkingLot(parkingLot: IParkingLot) {
  const newEntry = new ParkingLot(parkingLot);
  await newEntry.save();
}
