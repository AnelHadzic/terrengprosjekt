import { findAllUsers } from "@/app/lib/model/user"
import UserWithCompanyInfo from "@/app/lib/model/user/types/UserWithCompanyInfo"
import { Result } from "@/app/types"
export const list = async (filter?: {
  search: string | null
}): Promise<Result<UserWithCompanyInfo[]>> => {
  const users = await findAllUsers() as UserWithCompanyInfo[]

  if (users == null) {
    return { success: false, error: "Failed to retrieve users from database" }
  }

  return { success: true, data: users }
}
