import connectToDb from "@/app/lib/db/mongoose"
import { NextRequest } from "next/server"
import * as usersController from "@/app/features/users/users.controller"

export async function POST(request: NextRequest) {
  await connectToDb()
  const userCreationResponse = await usersController.createUsers(request)
  return userCreationResponse
}
