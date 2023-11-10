import connectToDb from "@/app/lib/db/mongoose"
import { NextRequest } from "next/server"
import * as companiesController from "@/app/features/companies/companies.controller"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const companyName = nextUrl?.searchParams?.get("companyName")
  const email = nextUrl?.searchParams?.get("email")
  const searchQuery = nextUrl?.searchParams?.get("searchQuery")

  // In case the request wants to check user agreement and existence (for login access for example)
  if (email) {
    const userExistenceAndAgreementResponse =
      await companiesController.getUserExistenceAndAgreement(email)
    return userExistenceAndAgreementResponse
  }

  const companiesResponse = await companiesController.listCompanies({
    search: searchQuery,
    companyName: companyName,
  })

  return companiesResponse
}

export async function POST(request: NextRequest) {
  await connectToDb()
  const companyCreationResponse = await companiesController.createCompany(
    request,
  )
  return companyCreationResponse
}
