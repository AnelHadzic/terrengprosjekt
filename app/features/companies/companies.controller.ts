import { ICompany } from "@/app/lib/interface/ICompany"
import { Result } from "@/app/types"
import { NextRequest, NextResponse } from "next/server"
import * as companiesService from "./companies.service"
import mongoose from "mongoose"

const getCompanyData = (data: unknown) => {
  return data &&
    typeof data === "object" &&
    ["companyName"].every((key) => Object.keys(data).includes(key))
    ? (data as ICompany)
    : null
}

export const createCompany = async (
  req: NextRequest,
): Promise<NextResponse<Result<ICompany>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()
  const companyData = getCompanyData(body)

  if (!companyData) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required field: companyName",
      },
      { status: 400 },
    )
  }
  const createdCompanyResult = await companiesService.create(companyData)

  if (!createdCompanyResult.success) {
    switch (createdCompanyResult.type) {
      case "Company.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: createdCompanyResult.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: createdCompanyResult.error,
          },
          { status: 500 },
        )
    }
  }
  return NextResponse.json(createdCompanyResult, { status: 201 })
}

export const listCompanies = async (filter?: {
  search: string | null
  companyName: string | null
}): Promise<NextResponse<Result<ICompany[]>>> => {
  const companies = await companiesService.list(filter)
  if (!companies.success)
    return NextResponse.json(
      {
        success: false,
        error: companies.error,
      },
      { status: 500 },
    )

  return NextResponse.json(companies, { status: 200 })
}

export const getCompanyById = async (
  companyId: string,
): Promise<NextResponse<Result<ICompany>>> => {
  if (!mongoose.isValidObjectId(companyId)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
      },
      { status: 400 },
    )
  }

  const company = await companiesService.single(companyId)
  if (!company.success) {
    switch (company.type) {
      case "Company.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: company.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: company.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(company, { status: 200 })
}

export const getUserExistenceAndAgreement = async (
  email: string,
): Promise<NextResponse<Result<UserExistenceAndAgreement>>> => {
  // Might want to add some error handling here in the future.
  const userExistenceAndAgreement =
    await companiesService.agreementStatusForUser(email)

  return NextResponse.json(userExistenceAndAgreement, { status: 200 })
}

export const updateCompanyById = async (
  req: NextRequest,
  companyId: string,
): Promise<NextResponse<Result<ICompany>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  if (!mongoose.isValidObjectId(companyId)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
      },
      { status: 400 },
    )
  }
  const body = await req.json()
  const companyData = getCompanyData(body)

  if (!companyData) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required field: companyId, companyName",
      },
      { status: 400 },
    )
  }
  const editedCompanyResult = await companiesService.edit(
    companyId,
    companyData,
  )

  if (!editedCompanyResult.success) {
    switch (editedCompanyResult.type) {
      case "Company.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: editedCompanyResult.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: editedCompanyResult.error,
          },
          { status: 500 },
        )
    }
  }
  return NextResponse.json(editedCompanyResult, { status: 200 })
}

export const deleteCompanyById = async (
  req: NextRequest,
  companyId: string,
): Promise<NextResponse<Result<ICompany>>> => {
  if (!mongoose.isValidObjectId(companyId)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
      },
      { status: 400 },
    )
  }
  const deletedCompanyResult = await companiesService.remove(companyId)

  if (!deletedCompanyResult.success) {
    switch (deletedCompanyResult.type) {
      case "Company.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: deletedCompanyResult.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: deletedCompanyResult.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(deletedCompanyResult, { status: 200 })
}
