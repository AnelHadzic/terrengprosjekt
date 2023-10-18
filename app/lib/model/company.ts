import { IAgreement } from "../interface/IAgreement"
import mongoose, { Schema } from "mongoose"
import { ICompany } from "../interface/ICompany"

const agreementSchema = new Schema<IAgreement>({
  domains: [String],
  emails: [String],
  parkingSpots: [
    {
      parkingName: String,
      parkingLimit: Number,
    },
  ],
})

const companySchema = new Schema({
  companyName: {
    type: String,
    unique: true,
  },
  contactEmail: String,
  privateAgreement: agreementSchema,
  companyAgreement: agreementSchema,
  internalComment: String,
  created: { type: Date, default: Date.now },
})

export const Company =
  mongoose.models.Company || mongoose.model<ICompany>("Company", companySchema)

export async function findCompany(companyId: string | null) {
  const session = await Company.findOne({ _id: { $eq: companyId } })

  if (session) {
    return session
  }

  return null
}

export async function findAllCompanies() {
  try {
    return await Company.find()
  } catch (error) {
    return null
  }
}

export async function findCompaniesByName(companyName: string) {
  const regex = RegExp(companyName, "i")
  const session = await Company.find({ companyName: regex })

  if (session) {
    return session
  }

  return null
}

// privateAgreement - liste
export async function findCompaniesListByPrivateAgreement(email: string) {
  const regex = RegExp(email, "i")
  const session = await Company.find({ "privateAgreement.emails":regex })

  if (session) {
    return session
  }

  return null
}

// comapnyAgreement - liste
export async function findCompaniesListByCompanyAgreement(email: string) {
  const regex = RegExp(email, "i")
  const session = await Company.find({ "companyAgreement.emails":regex })

  if (session) {
    return session
  }

  return null
}


// privateAgreement - domain
export async function findCompaniesDomainByPrivateAgreement(email: string) {
  const splitEmail = email.split("@");
  const domainToSearch = splitEmail[1];
  const regex = new RegExp(domainToSearch, "i");

  const companies = await Company.find({ "privateAgreement.domains": regex });

  return companies;
}

// companyAgreement - domain
export async function findCompaniesDomainByCompanyAgreement(email: string) {
  const splitEmail = email.split("@");
  const domainToSearch = splitEmail[1];
  const regex = new RegExp(domainToSearch, "i");

  const companies = await Company.find({ "companyAgreement.domains": regex });

  return companies;
}


export async function createCompany(company: ICompany) {
  const newEntry = new Company(company)
  await newEntry.save()
}

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
