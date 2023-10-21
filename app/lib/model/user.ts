import mongoose, { Schema } from "mongoose"
import { Role, Roles } from "../enum/role-type"
import { IUser } from "../interface/IUser"

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
  companyId: String,
  carRegNumbers: [String],
  primaryCarRegNumber: String
})

export const User = mongoose.models.User || mongoose.model("User", schema)

export async function findUser(email: string | null) {
  const session = await User.findOne({ email: { $eq: email } })

  if (session) {
    return session
  }

  return null
}

export async function findAllUsers() {
  try {
    return await User.find()
  } catch (error) {
    return null
  }
}

export async function findUserByToken(token: string) {
  const session = await User.findOne({ token: { $eq: token } })

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
