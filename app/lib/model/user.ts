import mongoose, { Schema } from "mongoose";
import { Role, Roles } from "../enum/role-type";
import { IUser } from "../interface/IUser";

const schema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  phone: String,
  created: { type: Date, default: Date.now },
  token: String,
  type: {
    type: Number,
    enum: Roles,
    default: Role.Unknown,
  }
});

export const User = mongoose.model("User", schema);

export async function findUser(email: string | null) {
  const session = await User.findOne({ email: { $eq: email } });

  if (session) {
    return session;
  }

  return null;
}

export async function findUserByToken(token: string) {
  const session = await User.findOne({ token: { $eq: token } });

  if (session) {
    return session;
  }

  return null;
}

export async function createUser(user: IUser) {
  const newEntry = new User(user);
  await newEntry.save();
}