import { Company } from "."

export async function findCompaniesByName(companyName: string) {
    const regex = RegExp(companyName, "i")
    const session = await Company.find({ companyName: regex })
  
    if (session) {
      return session
    }
  
    return null
  }