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
import { IUser } from "@/app/lib/interface/IUser"

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
  mongoose
  const existingCompany = await findCompany(company._id)
  if (existingCompany) {
    return {
      success: false,
      type: "Company.Duplicate",
      error: `Company with id ${company._id} already exists.`,
    }
  }

  let existingEmails: string[] = []
  if (company.companyAgreement?.emails) {
    await Promise.all(
      company.companyAgreement?.emails.map(async (email) => {
        const existingUserResult = await usersService.single(email)
        if (existingUserResult.success) {
          existingEmails.push(existingUserResult.data.email)
        }
      }),
    )
  }
  if (company.privateAgreement?.emails) {
    await Promise.all(
      company.privateAgreement?.emails.map(async (email) => {
        const existingUserResult = await usersService.single(email)
        if (existingUserResult.success) {
          existingEmails.push(existingUserResult.data.email)
        }
      }),
    )
  }
  if (existingEmails.length > 0) {
    return {
      success: false,
      error: `Users with the following email(s) already exists: ${existingEmails.join(
        `, `,
      )}`,
    }
  }

  const createdCompany = (await createCompany(company)) as ICompany

  let userCreationResults: Result<IUser>[] = []
  if (company.companyAgreement?.emails) {
    company.companyAgreement?.emails.map(async (email) => {
      const newUser: IUser = { email: email, company: createdCompany._id, role: 2 }
      const createdUserResult = await usersService.create(newUser)
      userCreationResults.push(createdUserResult)
    })
  }

  if (company.privateAgreement?.emails) {
    company.privateAgreement?.emails.map(async (email) => {
      const newUser: IUser = { email: email, company: createdCompany._id, role: 2 }
      const createdUserResult = await usersService.create(newUser)
      userCreationResults.push(createdUserResult)
    })
  }

  const hasErrors = userCreationResults.some((result) => !result.success)

  if (hasErrors) {
    let errorMessages: string[] = []
    userCreationResults.map((result) => {
      if (!result.success) {
        errorMessages.push(result.error)
      }
    })

    // Delete createdCompany and all new users. 
    
    return { success: false, error: errorMessages.join(`. \n`) }
  } else {
    return { success: true, data: createdCompany }
  }
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
