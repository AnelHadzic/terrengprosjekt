import { User } from "."

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
