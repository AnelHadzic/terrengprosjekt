import connectToDb from "@/app/lib/db/mongoose"
import { findParkingSession } from "@/app/lib/model/parkingSession"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { regNr: string } },
) {
  await connectToDb()
  const regNr = context.params.regNr

  const parkingSession = await findParkingSession(regNr)

  if (parkingSession === null) {
    return NextResponse.json({ data: null }, { status: 200 })
  }

  return NextResponse.json({ data: parkingSession }, { status: 200 })
}
