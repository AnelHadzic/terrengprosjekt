import connectToDb from "@/app/lib/db/mongoose"
import { getAllParkingSessionsByEmail } from "@/app/lib/model/parkingSession/getAll"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { userEmail: string } },
) {
  try {
    await connectToDb()
    const userEmail = context.params.userEmail

    console.log(context.params)
    const parkingSession = await getAllParkingSessionsByEmail(userEmail)

    if (parkingSession === null) {
      return NextResponse.json({ data: null }, { status: 200 })
    }

    return NextResponse.json({ data: parkingSession }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
