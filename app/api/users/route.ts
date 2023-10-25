import connectToDb from "@/app/lib/db/mongoose"
import { IUser } from "@/app/lib/interface/IUser"
import {
  createUser,
  findAllUsers,
  findUser,
  findUsersByMultiSearch,
} from "@/app/lib/model/user"
import { NextRequest, NextResponse } from "next/server"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const email = nextUrl?.searchParams?.get("email")
  const searchQuery = nextUrl?.searchParams?.get("searchQuery")

  let users

  if (email) {
    users = await findUser(email)
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
