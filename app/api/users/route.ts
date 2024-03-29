import connectToDb from "@/app/lib/db/mongoose"
import { IUser } from "@/app/lib/interface/IUser"
import mongoose from "mongoose"
import {
  createUser,
  findAllUsers,
  findUser,
  findUsersByCompanyId,
  findUsersByCompanyIdAndMultiSearch,
  findUsersByMultiSearch,
} from "@/app/lib/model/user"
import { NextRequest, NextResponse } from "next/server"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const email = nextUrl?.searchParams?.get("email")
  const searchQuery = nextUrl?.searchParams?.get("searchQuery")
  const companyId = nextUrl?.searchParams?.get("companyId")

  let users

  if (email) {
    users = await findUser(email)
  } else if (companyId) {
    if (!mongoose.isValidObjectId(companyId)) {
      return NextResponse.json(
        {
          data: "Invalid companyId format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
        },
        { status: 400 },
      )
    }
    if (searchQuery) {
      users = await findUsersByCompanyIdAndMultiSearch(companyId, searchQuery)
    }
    else {
      users = await findUsersByCompanyId(companyId)
    }
  } else if (searchQuery) {
    users = await findUsersByMultiSearch(searchQuery)
  } else {
    users = await findAllUsers()
  }

  if (users === null) {
    return NextResponse.json(
      { data: "Database operation error" },
      { status: 500 },
    )
  }

  return NextResponse.json({ data: users }, { status: 200 })
}

export async function POST(request: Request) {
  await connectToDb()
  const body = await request.json()

  const user: IUser = body as IUser

  try {
    await createUser(user)
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user in db. Error: " + error },
      { status: 400 },
    )
  }
}
