import connectToDb from "@/app/lib/db/mongoose"
import { deleteParkingSession } from "@/app/lib/model/parkingSession"
import { editParkingSession } from "@/app/lib/model/parkingSession/edit"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  await connectToDb()

  const parkingSessionId = context.params.id

  try {
    const deletedParkingSession = await deleteParkingSession(parkingSessionId)
    return NextResponse.json({ data: deletedParkingSession }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete parkingSession in db. Error: " + error },
      { status: 400 },
    )
  }
}

// Update parkingSession stop time.
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    await connectToDb()
    const parkingSessionId = context.params.id
    const body = await request.json()

    const editedParkingSessionResponse = await editParkingSession(
      parkingSessionId,
      body,
    )
    return new Response(JSON.stringify(editedParkingSessionResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in PATCH function:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
