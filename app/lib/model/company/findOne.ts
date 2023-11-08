import { Company } from "."

export async function findCompany(companyId: string | undefined) {
    const session = await Company.findOne({ _id: { $eq: companyId } })
  
    if (session) {
      return session
    }
  
    return null
  }