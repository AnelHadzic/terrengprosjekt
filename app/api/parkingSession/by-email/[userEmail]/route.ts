import connectToDb from "@/app/lib/db/mongoose"
import { getAllParkingSessionsByEmail } from "@/app/lib/model/parkingSession/getbyEmail"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { userEmail: string } },
) {
  await connectToDb()
  const userEmail = context.params.userEmail

  const parkingSessions = await getAllParkingSessionsByEmail(userEmail)

  if (parkingSessions.length === 0) {
    return NextResponse.json({ data: null }, { status: 200 })
  }

  return NextResponse.json({ data: parkingSessions }, { status: 200 })
}
