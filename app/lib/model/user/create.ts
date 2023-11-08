import { User } from "."
import { IUser } from "../../interface/IUser"

export async function createUser(user: IUser) {
  const newEntry = new User(user)
  await newEntry.save()
  return newEntry
}
