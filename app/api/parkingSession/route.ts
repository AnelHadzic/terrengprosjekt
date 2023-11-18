import connectToDb from "@/app/lib/db/mongoose"
import { IParkingSession } from "@/app/lib/interface/IParkingSession"
import {
  createParkingSession,
  findParkingSession,
  getAllParkingSessions,
} from "@/app/lib/model/parkingSession"

import { NextRequest, NextResponse } from "next/server"

export async function GET({ nextUrl }: NextRequest) {
  await connectToDb()
  const parkingSessions = await getAllParkingSessions()

  if (parkingSessions === null) {
    return NextResponse.json({ data: null }, { status: 200 })
  }

  return NextResponse.json({ data: parkingSessions }, { status: 200 })
}

export async function POST(request: Request) {
  await connectToDb()
  const body = await request.json()

  const parkingSession: IParkingSession = body as IParkingSession

  try {
    await createParkingSession(parkingSession)
    console.log(parkingSession)
    return NextResponse.json({ data: parkingSession }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create parkingSession in db. Error: " + error },
      { status: 400 },
    )
  }
}
