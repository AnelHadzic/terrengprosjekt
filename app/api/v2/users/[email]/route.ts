import connectToDb from "@/app/lib/db/mongoose"
import { NextRequest } from "next/server"
import * as usersController from "@/app/features/users/users.controller"

export async function GET(
  request: NextRequest,
  context: { params: { email: string } },
) {
  await connectToDb()
  const email = context.params.email
  const user = await usersController.getUserByEmail(email)
  return user
}

export async function PATCH(
  request: NextRequest,
  context: { params: { email: string } },
) {
  await connectToDb()
  const email = context.params.email
  const userEditResponse = await usersController.updateUserByEmail(
    request,
    email,
  )
  return userEditResponse
}

export async function DELETE(
  request: NextRequest,
  context: { params: { email: string } },
) {
  await connectToDb()
  const email = context.params.email
  const deleteUserResponse = await usersController.deleteUserByEmail(
    request,
    email,
  )
  return deleteUserResponse
}
