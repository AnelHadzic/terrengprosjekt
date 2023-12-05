import bootstrapDb from "./app/lib/db/bootstrap-db"
import connectToDb from "./app/lib/db/mongoose"

export async function register() {
  await connectToDb()

  await bootstrapDb()
}
