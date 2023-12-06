import UserWithCompanyInfo from "@/app/lib/model/user/types/UserWithCompanyInfo"
import { Result } from "@/app/types"
import { NextRequest, NextResponse } from "next/server"
import * as usersService from "./users.service"
import { IUser } from "@/app/lib/interface/IUser"
import UserWithPopulatedCompany from "@/app/lib/model/user/types/UserWithPopulatedCompany"
import { BulkUser } from "@/app/lib/model/user/types/BulkUser"

const getUserData = (data: unknown) => {
  return data &&
    typeof data === "object" &&
    ["email"].every((key) => Object.keys(data).includes(key))
    ? (data as IUser)
    : null
}

export const createUser = async (
  req: NextRequest,
): Promise<NextResponse<Result<IUser>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()
  const userData = getUserData(body)

  if (!userData) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required field: email",
      },
      { status: 400 },
    )
  }

  const createdUserResult = await usersService.create(userData)

  if (!createdUserResult.success) {
    switch (createdUserResult.type) {
      case "User.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: createdUserResult.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: createdUserResult.error,
          },
          { status: 500 },
        )
    }
  }
  return NextResponse.json(createdUserResult, { status: 201 })
}

export const createManyUsers = async (
  req: NextRequest,
): Promise<NextResponse<Result<BulkUser[]>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()
  const userList = body as BulkUser[]

  const createdUsersResult = await usersService.createMany(userList)

  if (!createdUsersResult.success) {
    switch (createdUsersResult.type) {
      case "User.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: createdUsersResult.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: createdUsersResult.error,
          },
          { status: 500 },
        )
    }
  }
  return NextResponse.json(createdUsersResult, { status: 201 })
}

export const listUsers = async (filter?: {
  companyId: string | null
  search: string | null
}): Promise<NextResponse<Result<UserWithCompanyInfo[]>>> => {
  const users = await usersService.list(filter)

  if (!users.success)
    return NextResponse.json(
      {
        success: false,
        error: users.error,
      },
      { status: 500 },
    )

  return NextResponse.json(users, { status: 200 })
}

export const getUserByEmail = async (
  email: string,
): Promise<NextResponse<Result<UserWithPopulatedCompany>>> => {
  const user = await usersService.single(email)

  if (!user.success)
    switch (user.type) {
      case "User.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: user.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: user.error,
          },
          { status: 500 },
        )
    }

  return NextResponse.json(user, { status: 200 })
}

export const updateUserByEmail = async (
  req: NextRequest,
  email: string,
): Promise<NextResponse<Result<IUser>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()
  const userData = getUserData(body)

  if (!userData) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required field: email",
      },
      { status: 400 },
    )
  }
  const editedUserResult = await usersService.edit(email, userData)

  if (!editedUserResult.success) {
    switch (editedUserResult.type) {
      case "User.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: editedUserResult.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: editedUserResult.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(editedUserResult, { status: 200 })
}

export const deleteUserByEmail = async (
  req: NextRequest,
  email: string,
): Promise<NextResponse<Result<IUser>>> => {
  const deletedUserResult = await usersService.remove(email)

  if (!deletedUserResult.success) {
    switch (deletedUserResult.type) {
      case "User.NotFound":
        return NextResponse.json(
          {
            success: false,
            error: deletedUserResult.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: deletedUserResult.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(deletedUserResult, { status: 200 })
}
