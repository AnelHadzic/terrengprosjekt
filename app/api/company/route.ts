import {
  createCompany,
  findCompaniesByMultiSearch,
} from "./../../lib/model/company"
import connectToDb from "@/app/lib/db/mongoose"
import { ICompany } from "@/app/lib/interface/ICompany"
import { findAllCompanies, findCompaniesByName } from "@/app/lib/model/company"
import { NextRequest, NextResponse } from "next/server"
import { getAgreement } from "../../features/companies/getAgreement"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const companyName = nextUrl?.searchParams?.get("companyName")
  const email = nextUrl?.searchParams?.get("email")
  const searchQuery = nextUrl?.searchParams?.get("searchQuery")

  let companies

  // Hvis companyName parameter blir brukt, så bruk findCompaniesByName funksjon
  if (companyName) {
    companies = await findCompaniesByName(companyName)

    // Hvis email blir brukt som parameter, så bruk disse 4 funksjonene under.
  } else if (email) {
    const companyAgreement = await getAgreement(email)

    const emailExists = Boolean(companyAgreement)

    // Returner data hvis noen ble funnet.
    return NextResponse.json(
      { emailExists, data: companyAgreement },
      { status: 200 },
    )
    // Hvis companyName søk ikke finner noe, så søk alle bedrifter.
  } else if (searchQuery) {
    companies = await findCompaniesByMultiSearch(searchQuery)
  } else {
    companies = await findAllCompanies()
  }

  if (companies === null) {
    return NextResponse.json(
      { data: "Database operation error" },
      { status: 500 },
    )
  }

  return NextResponse.json({ data: companies }, { status: 200 })
}

export async function POST(request: Request) {
  await connectToDb()
  const body = await request.json()

  const company: ICompany = body as ICompany

  try {
    await createCompany(company)
    return NextResponse.json({ data: company }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create company in db. Error: " + error },
      { status: 400 },
    )
  }

  // Useful for troubleshooting
  // const bodystring = JSON.stringify(company);
  // console.log(`Posted data stringified is: ${bodystring}`);
  // console.log(`Posted data regular is: ${body}`);
  // console.log(`Company name: ${company.companyName}`)
}
