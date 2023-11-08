import {
  findCompaniesDomainByCompanyAgreement,
  findCompaniesDomainByPrivateAgreement,
  findCompaniesListByCompanyAgreement,
  findCompaniesListByPrivateAgreement,
} from "@/app/lib/model/company"

export const getAgreement = async (email: string) => {
  const companiesListByPrivateAgreement =
    await findCompaniesListByPrivateAgreement(email)
  const companiesListByCompanyAgreement =
    await findCompaniesListByCompanyAgreement(email)
  const companiesDomainByPrivateAgreement =
    await findCompaniesDomainByPrivateAgreement(email)
  const companiesDomainByCompanyAgreement =
    await findCompaniesDomainByCompanyAgreement(email)

  let agreementType
  let agreementData

  if (companiesListByPrivateAgreement?.length) {
    agreementType = "ListByPrivateAgreement"
    agreementData =
      companiesListByPrivateAgreement[0]?.privateAgreement?.parkingSpots
  } else if (companiesListByCompanyAgreement?.length) {
    agreementType = "ListByCompanyAgreement"
    agreementData =
      companiesListByCompanyAgreement[0]?.companyAgreement?.parkingSpots
  } else if (companiesDomainByPrivateAgreement?.length) {
    agreementType = "DomainByPrivateAgreement"
    agreementData =
      companiesDomainByPrivateAgreement[0]?.privateAgreement?.parkingSpots
  } else if (companiesDomainByCompanyAgreement?.length) {
    agreementType = "DomainByCompanyAgreement"
    agreementData =
      companiesDomainByCompanyAgreement[0]?.companyAgreement?.parkingSpots
  } else {
    agreementType = "NoAgreement"
    agreementData = null
  }

  return { agreementType, agreementData }
}
