import connectToDb from "@/app/lib/db/mongoose"
import { NextRequest } from "next/server"
import * as companiesController from "@/app/features/companies/companies.controller"

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  await connectToDb()
  const companyId = context.params.id
  const company = await companiesController.getCompanyById(companyId)
  return company
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } },
) {
  await connectToDb()
  const companyId = context.params.id
  const editedCompanyResponse = await companiesController.updateCompanyById(
    request,
    companyId,
  )
  return editedCompanyResponse
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } },
) {
  await connectToDb()
  const companyId = context.params.id

  const deletedCompanyResponse = await companiesController.deleteCompanyById(
    request,
    companyId,
  )
  return deletedCompanyResponse
}
