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

  if (companiesListByPrivateAgreement?.length) {
    return "ListByPrivateAgreement"
  }
  if (companiesListByCompanyAgreement?.length) {
    return "ListByCompanyAgreement"
  }
  if (companiesDomainByPrivateAgreement?.length) {
    return "DomainByPrivateAgreement"
  }
  if (companiesDomainByCompanyAgreement?.length) {
    return "DomainByCompanyAgreement"
  }
  return null
}
