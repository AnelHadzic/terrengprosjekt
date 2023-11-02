import connectToDb from "@/app/lib/db/mongoose"
import { findParkingLot } from "@/app/lib/model/parkingLot"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { parkingName: string } },
) {
  await connectToDb()
  const parkingName = context.params.parkingName

  const company = await findParkingLot(parkingName)

  if (company === null) {
    return NextResponse.json(
      { data: `No parkingLot found with parkingName ${parkingName}` },
      { status: 404 },
    )
  }

  return NextResponse.json({ data: company }, { status: 200 })
}
