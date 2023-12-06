import { User } from "."
import { IUser } from "../../interface/IUser"
import { BulkUser } from "./types/BulkUser"

export async function createManyUsers(users: BulkUser[]) {
  try {
    const dbUsers = users.map((user) => {
      const dbUser: IUser = {
        email: user.email,
        role: user.role,
        company: user.companyId,
        created: new Date(),
      }
      return dbUser
    })
    const newUsers = await User.insertMany(dbUsers)
    return newUsers
  } catch (error) {
    return null
  }
}
