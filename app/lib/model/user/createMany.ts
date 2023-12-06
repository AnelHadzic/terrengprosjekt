import { User } from "."
import { IUser } from "../../interface/IUser"

export async function createManyUsers(users: IUser[]) {
  try {
    const newUsers = await User.insertMany(users)
    return newUsers
  } catch (error) {
    return null
  }
}
