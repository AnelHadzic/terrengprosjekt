import { User } from "."
import { IUser } from "../../interface/IUser"

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