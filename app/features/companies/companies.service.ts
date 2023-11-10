import {
  createCompany,
  deleteCompany,
  editCompany,
  findAllCompanies,
  findCompaniesByMultiSearch,
  findCompaniesByName,
  findCompany,
} from "@/app/lib/model/company"
import { ICompany } from "@/app/lib/interface/ICompany"
import { Result } from "@/app/types"
import { getAgreement } from "./getAgreement"
import * as usersService from "../users/users.service"

export const single = async (companyId: string): Promise<Result<ICompany>> => {
  try {
    const company = await findCompany(companyId)
    if (company == null) {
      return {
        success: false,
        error: `Could not find company with id: ${companyId}`,
        type: `Company.NotFound`,
      }
    }
    return { success: true, data: company }
  } catch (error) {
    return { success: false, error: `An error occurred: ${error}` }
  }
}

export const list = async (filter?: {
  search: string | null
  companyName: string | null
}): Promise<Result<ICompany[]>> => {
  let companies = null
  if (filter?.search) {
    companies = await findCompaniesByMultiSearch(filter.search)
  } else if (filter?.companyName) {
    companies = await findCompaniesByName(filter.companyName)
  } else {
    companies = await findAllCompanies()
  }
  if (companies == null) {
    return {
      success: false,
      error: "Failed to retrieve companies from database.",
    }
  }
  return { success: true, data: companies }
}

export const agreementStatusForUser = async (
  email: string,
): Promise<Result<UserExistenceAndAgreement>> => {
  const agreement = await getAgreement(email)

  let existingEmail = false

  const existingUser = await usersService.single(email)
  if (existingUser.success) {
    existingEmail = true
  }

  if (agreement.agreementData != null) {
    existingEmail = true
  }

  const userExistenceAndAgreement: UserExistenceAndAgreement = {
    emailExists: existingEmail,
    agreement: agreement,
  }

  return { success: true, data: userExistenceAndAgreement }
}

export const create = async (company: ICompany): Promise<Result<ICompany>> => {
  const existingCompany = await findCompany(company._id)
  if (existingCompany) {
    return {
      success: false,
      type: "Company.Duplicate",
      error: `Company with id ${company._id} already exists.`,
    }
  }

  const createdCompany = await createCompany(company)
  return { success: true, data: createdCompany }
}

export const edit = async (
  companyId: string,
  company: ICompany,
): Promise<Result<ICompany>> => {
  const existingCompany = await findCompany(companyId)
  if (existingCompany) {
    const updatedCompany = await editCompany(companyId, company)
    if (updatedCompany) {
      return { success: true, data: updatedCompany }
    } else {
      return { success: false, error: "Failed to update existing company." }
    }
  } else {
    return {
      success: false,
      type: "Company.NotFound",
      error: `Company with id ${company._id} does not exist.`,
    }
  }
}

export const remove = async (companyId: string): Promise<Result<ICompany>> => {
  const existingCompany = await findCompany(companyId)
  if (existingCompany) {
    const removedCompany = await deleteCompany(companyId)
    if (removedCompany) {
      return { success: true, data: removedCompany }
    } else {
      return {
        success: false,
        error: "Failed to remove existing company.",
      }
    }
  } else {
    return {
      success: false,
      type: "Company.NotFound",
      error: `Company with id ${companyId} does not exist.`,
    }
  }
}
