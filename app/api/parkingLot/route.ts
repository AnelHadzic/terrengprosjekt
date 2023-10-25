import connectToDb from "@/app/lib/db/mongoose"
import { IParkingLot } from "@/app/lib/interface/IParkingLot"
import { getAllParkingLots, createParkingLot } from "@/app/lib/model/parkingLot"

import { NextResponse } from "next/server"

export async function GET(request: Request) {
  await connectToDb()

  try {
    const parkingLots = await getAllParkingLots()

    return NextResponse.json({ data: parkingLots }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch parking lots. Error: " + error },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  await connectToDb()
  const body = await request.json()

  const parkingLot: IParkingLot = body as IParkingLot

  try {
    await createParkingLot(parkingLot)
    return NextResponse.json({ data: parkingLot }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create parking in db. Error: " + error },
      { status: 400 },
    )
  }
}
