import { Company } from "."

export async function findAllCompanies() {
    try {
      return await Company.find()
    } catch (error) {
      return null
    }
  }