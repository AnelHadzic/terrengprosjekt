import connectToDb from "@/app/lib/db/mongoose"
import { findParkingSessionByEmail } from "@/app/lib/model/parkingSession"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { userEmail: string } },
) {
  try {
    await connectToDb()
    const userEmail = context.params.userEmail

    const parkingSession = await findParkingSessionByEmail(userEmail)

    if (parkingSession === null) {
      return NextResponse.json({ data: null }, { status: 200 })
    }
    return NextResponse.json({ data: parkingSession }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
