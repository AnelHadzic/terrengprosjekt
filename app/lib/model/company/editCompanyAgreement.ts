import { BulkUser } from "./../user/types/BulkUser"
import { Company } from "."
import { ICompany } from "../../interface/ICompany"

export async function editCompanyAgreement(bulkUser: BulkUser) {
  try {
    const existingCompany = await Company.findById(bulkUser.companyId)

    if (!existingCompany) {
      throw new Error("Company not found")
    }
    let updatedData = existingCompany as ICompany
    if (
      !updatedData.companyAgreement?.emails ||
      !updatedData.privateAgreement?.emails
    ) {
      throw new Error("Agreements not found")
    }
    switch (bulkUser.agreementType) {
      case 0:
        if (updatedData.companyAgreement?.emails.includes(bulkUser.email)) {
          const index = updatedData.companyAgreement.emails.indexOf(
            bulkUser.email,
          )
          updatedData.companyAgreement.emails.splice(index, 1)
        }

        if (updatedData.privateAgreement?.emails.includes(bulkUser.email)) {
          const index = updatedData.privateAgreement.emails.indexOf(
            bulkUser.email,
          )
          updatedData.privateAgreement.emails.splice(index, 1)
        }
        break

      case 1:
        if (updatedData.privateAgreement?.emails.includes(bulkUser.email)) {
          const index = updatedData.privateAgreement.emails.indexOf(
            bulkUser.email,
          )
          updatedData.privateAgreement.emails.splice(index, 1)
        }
        updatedData.companyAgreement.emails.push(bulkUser.email)
        break

      case 2:
        if (updatedData.companyAgreement?.emails.includes(bulkUser.email)) {
          const index = updatedData.companyAgreement.emails.indexOf(
            bulkUser.email,
          )
          updatedData.companyAgreement.emails.splice(index, 1)
        }
        updatedData.privateAgreement.emails.push(bulkUser.email)
      default:
        throw new Error("Invalid company agreement.")
    }
    Object.assign(existingCompany, updatedData)

    await existingCompany.save()

    return existingCompany
  } catch (error) {
    throw new Error(`Error editing company: ${error}`)
  }
}
