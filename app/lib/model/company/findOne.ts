import { Company } from "."

export async function findCompany(
  companyId?: string,
  companyName?: string,
) {
  if (companyId) {
    const session = await Company.findOne({ _id: { $eq: companyId } })

    if (session) {
      return session
    }
  }

  if (companyName) {
    const session = await Company.findOne({ companyName: { $eq: companyName } })

    if (session) {
      return session
    }
  }

  return null
}
