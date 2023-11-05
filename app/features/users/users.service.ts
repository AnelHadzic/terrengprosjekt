import { IUser } from "@/app/lib/interface/IUser"
import {
  createUser,
  deleteUser,
  editUser,
  findAllUsers,
  findUser,
  findUsersByCompanyIdAndMultiSearch,
  findUsersByMultiSearch,
} from "@/app/lib/model/user"
import UserWithCompanyInfo from "@/app/lib/model/user/types/UserWithCompanyInfo"
import { Result } from "@/app/types"

export const list = async (filter?: {
  companyId: string | null
  search: string | null
}): Promise<Result<UserWithCompanyInfo[]>> => {
  let users = null
  if (filter?.search) {
    if (filter.companyId) {
      users = (await findUsersByCompanyIdAndMultiSearch(
        filter.companyId,
        filter.search,
      )) as UserWithCompanyInfo[]
    } else {
      users = (await findUsersByMultiSearch(
        filter.search,
      )) as UserWithCompanyInfo[]
    }
  } else {
    users = (await findAllUsers()) as UserWithCompanyInfo[]
  }

  if (users == null) {
    return { success: false, error: "Failed to retrieve users from database" }
  }

  return { success: true, data: users }
}

export const create = async (user: IUser): Promise<Result<IUser>> => {
  const existingUser = await findUser(user.email)
  if (existingUser) {
    return {
      success: false,
      type: "User.Duplicate",
      error: `User with email ${user.email} already exists.`,
    }
  }

  const createdUser = (await createUser(user)) as IUser

  return { success: true, data: createdUser }
}

export const edit = async (
  email: string,
  user: IUser,
): Promise<Result<IUser>> => {
  const existingUser = await findUser(user.email)
  if (existingUser) {
    const updatedUser = (await editUser(email, user)) as IUser
    if (updatedUser) {
      return { success: true, data: updatedUser }
    } else {
      return { success: false, error: "Failed to update existing user." }
    }
  } else {
    return {
      success: false,
      type: "User.NotFound",
      error: `User with email ${user.email} does not exist.`,
    }
  }
}

export const remove = async (email: string): Promise<Result<IUser>> => {
  const existingUser = await findUser(email)
  if (existingUser) {
    const removedUser = await deleteUser(email)
    if (removedUser) {
      return { success: true, data: removedUser }
    } else {
      return { success: false, error: "Failed to remove existing user." }
    }
  } else {
    return {
      success: false,
      type: "User.NotFound",
      error: `User with email ${email} does not exist.`,
    }
  }
}
