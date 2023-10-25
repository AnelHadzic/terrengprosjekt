import connectToDb from "@/app/lib/db/mongoose"
import { deleteParkingSession } from "@/app/lib/model/parkingSession"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  await connectToDb()

  const parkingSessionId = context.params.id

  try {
    const deletedCompany = await deleteParkingSession(parkingSessionId)
    return NextResponse.json({ data: deletedCompany }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete parkingSession in db. Error: " + error },
      { status: 400 },
    )
  }
}
