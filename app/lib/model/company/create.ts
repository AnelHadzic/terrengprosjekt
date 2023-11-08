import { Company } from "."
import { ICompany } from "../../interface/ICompany"

export async function createCompany(company: ICompany) {
    const newEntry = new Company(company)
    await newEntry.save()
  }