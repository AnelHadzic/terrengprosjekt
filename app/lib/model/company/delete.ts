import { Company } from "."

export async function deleteCompany(companyId: string) {
    try {
      const deletedCompany = await Company.findByIdAndRemove(companyId)
  
      if (!deletedCompany) {
        throw new Error("Company not found")
      }
  
      return deletedCompany
    } catch (error) {
      throw new Error(`Error deleting company: ${error}`)
    }
  }