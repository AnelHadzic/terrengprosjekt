import { User } from "."
import { Company } from "../company"

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
