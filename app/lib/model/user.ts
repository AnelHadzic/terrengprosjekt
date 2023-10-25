import mongoose, { Schema } from "mongoose"
import { Role, Roles } from "../enum/role-type"
import { IUser } from "../interface/IUser"
import { Company } from "./company"

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
  role: {
    type: Number,
    enum: Roles,
    default: Role.Unknown,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  carRegNumbers: [String],
  primaryCarRegNumber: String
})

export const User = mongoose.models.User || mongoose.model("User", schema)

export async function findUser(email: string | null) {
  const session = await User.findOne({ email: { $eq: email } }).populate({
    path: "company",
    model: Company,
  })

  if (session) {
    return session
  }

  return null
}

export async function findAllUsers() {
  try {
    return await User.find().populate({
      path: "company",
      model: Company,
    })

  } catch (error) {
    return null
  }
}

export async function findUserByToken(token: string) {
  const session = await User.findOne({ token: { $eq: token } }).populate({
    path: "company",
    model: Company,
  })

  if (session) {
    return session
  }

  return null
}

export async function findUsersByMultiSearch(searchQuery: string) {
  const regex = RegExp(searchQuery, "i")
  const session = await User.find({
    $or: [
      { email: regex },
      { firstname: regex },
      { lastname: regex },
      { phone: regex },
      { company: regex },
      { carRegNumbers: { $in: [regex] } },
      { primaryCarRegNumber: regex },
    ],
  }).populate({
    path: "company",
    model: Company,
  })
  if (session) {
    return session
  }

  return null
}

export async function createUser(user: IUser) {
  const newEntry = new User(user)
  await newEntry.save()
}

export async function editUser(email: string, updatedData: Partial<IUser>) {
  try {
    const existingUser = await User.findOne({ email: { $eq: email } })

    if (!existingUser) {
      throw new Error(`User with email ${email} was not found`)
    }

    Object.assign(existingUser, updatedData)

    await existingUser.save()

    return existingUser
  } catch (error) {
    throw new Error(`Error editing user: ${error}`)
  }
}

export async function deleteUser(email: string) {
  try {
    const deletedUser = await User.findOneAndDelete({ email: { $eq: email } })

    if (!deletedUser) {
      throw new Error(`User with email ${email} was not found`)
    }

    return deletedUser
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`)
  }
}
