import { Company } from "."
import { ICompany } from "../../interface/ICompany"

export async function editCompany(
    companyId: string,
    updatedData: Partial<ICompany>,
  ) {
    try {
      const existingCompany = await Company.findById(companyId)
  
      if (!existingCompany) {
        throw new Error("Company not found")
      }
  
      Object.assign(existingCompany, updatedData)
  
      await existingCompany.save()
  
      return existingCompany
    } catch (error) {
      throw new Error(`Error editing company: ${error}`)
    }
  }