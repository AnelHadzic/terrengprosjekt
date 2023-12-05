import mongoose, { Schema } from "mongoose"
import { IAgreement } from "../../interface/IAgreement"
import { ICompany } from "../../interface/ICompany"

export { createCompany } from "./create"
export { findAllCompanies } from "./findAll"
export {
  findCompaniesDomainByCompanyAgreement,
  findCompaniesDomainByPrivateAgreement,
  findCompaniesListByCompanyAgreement,
  findCompaniesListByPrivateAgreement,
} from "./findByAgreement"
export { findCompaniesByName } from "./findByCompanyName"
export { findCompaniesByMultiSearch } from "./findByMultiSearch"
export { findCompany } from "./findOne"
export { editCompany } from "./edit"
export { deleteCompany } from "./delete"

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
  mongoose.models.Company || mongoose.model("Company", companySchema)
