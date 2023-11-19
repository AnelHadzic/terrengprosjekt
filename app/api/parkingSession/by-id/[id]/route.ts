import connectToDb from "@/app/lib/db/mongoose"
import { editParkingSession } from "@/app/lib/model/parkingSession"
import { NextRequest } from "next/server"

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
