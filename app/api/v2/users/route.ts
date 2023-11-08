import connectToDb from "@/app/lib/db/mongoose"
import { NextRequest } from "next/server"

import * as usersController from "@/app/features/users/users.controller"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const searchQuery = nextUrl?.searchParams?.get("searchQuery")
  const companyId = nextUrl?.searchParams?.get("companyId")

  const userResponse = await usersController.listUsers({
    companyId: companyId,
    search: searchQuery,
  })

  return userResponse
}

export async function POST(request: NextRequest) {
  await connectToDb()
  const userCreationResponse = await usersController.createUser(request)
  return userCreationResponse
}
