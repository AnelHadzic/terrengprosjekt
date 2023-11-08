import { Company } from "."

export async function findCompaniesByMultiSearch(searchQuery: string) {
    const regex = RegExp(searchQuery, "i")
    const session = await Company.find({
      $or: [
        { companyName: regex },
        { contactEmail: regex },
        { "companyAgreement.domains": { $in: [regex] } },
        { "privateAgreement.domains": { $in: [regex] } },
        { "companyAgreement.parkingSpots.parkingName": regex },
        { "privateAgreement.parkingSpots.parkingName": regex },
      ],
    })
    if (session) {
      return session
    }
  
    return null
  }