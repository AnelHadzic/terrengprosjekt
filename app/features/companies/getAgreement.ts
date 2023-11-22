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
  let shouldPay

  if (companiesListByPrivateAgreement?.length) {
    agreementType = "ListByPrivateAgreement"
    shouldPay = true
    agreementData =
      companiesListByPrivateAgreement[0]?.privateAgreement?.parkingSpots
  } else if (companiesListByCompanyAgreement?.length) {
    agreementType = "ListByCompanyAgreement"
    shouldPay = false
    agreementData =
      companiesListByCompanyAgreement[0]?.companyAgreement?.parkingSpots
  } else if (companiesDomainByPrivateAgreement?.length) {
    agreementType = "DomainByPrivateAgreement"
    shouldPay = true
    agreementData =
      companiesDomainByPrivateAgreement[0]?.privateAgreement?.parkingSpots
  } else if (companiesDomainByCompanyAgreement?.length) {
    agreementType = "DomainByCompanyAgreement"
    shouldPay = false
    agreementData =
      companiesDomainByCompanyAgreement[0]?.companyAgreement?.parkingSpots
  } else {
    agreementType = "NoAgreement"
    shouldPay = false
    agreementData = null
  }

  return { agreementType, shouldPay, agreementData }
}
