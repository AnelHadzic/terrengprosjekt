import { Company } from "."

// privateAgreement - liste
export async function findCompaniesListByPrivateAgreement(email: string) {
    const regex = RegExp(email, "i")
    const session = await Company.find({ "privateAgreement.emails": regex })
  
    if (session) {
      return session
    }
  
    return null
  }
  
  // comapnyAgreement - liste
  export async function findCompaniesListByCompanyAgreement(email: string) {
    const regex = RegExp(email, "i")
    const session = await Company.find({ "companyAgreement.emails": regex })
  
    if (session) {
      return session
    }
  
    return null
  }
  
  // privateAgreement - domain
  export async function findCompaniesDomainByPrivateAgreement(email: string) {
    const splitEmail = email.split("@")
    if (splitEmail.length !== 2) {
      return []
    }
    const domainToSearch = splitEmail[1]
    const regex = new RegExp(domainToSearch, "i")
  
    const companies = await Company.find({ "privateAgreement.domains": regex })
  
    return companies
  }
  
  // companyAgreement - domain
  export async function findCompaniesDomainByCompanyAgreement(email: string) {
    const splitEmail = email.split("@")
    if (splitEmail.length !== 2) {
      return []
    }
    const domainToSearch = splitEmail[1]
    const regex = new RegExp(domainToSearch, "i")
  
    const companies = await Company.find({ "companyAgreement.domains": regex })
  
    return companies
  }