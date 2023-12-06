import { IUser } from "@/app/lib/interface/IUser"
import {
  createManyUsers,
  createUser,
  deleteUser,
  editUser,
  findAllUsers,
  findUser,
  findUsersByCompanyIdAndMultiSearch,
  findUsersByMultiSearch,
} from "@/app/lib/model/user"
import { BulkUser } from "@/app/lib/model/user/types/BulkUser"
import UserWithCompanyInfo from "@/app/lib/model/user/types/UserWithCompanyInfo"
import UserWithPopulatedCompany from "@/app/lib/model/user/types/UserWithPopulatedCompany"
import { Result } from "@/app/types"

export const single = async (
  email: string,
): Promise<Result<UserWithPopulatedCompany>> => {
  try {
    const user = await findUser(email)
    if (user === null) {
      return {
        success: false,
        error: `Could not find user with email ${email}`,
        type: `User.NotFound`,
      }
    }
    return { success: true, data: user as UserWithPopulatedCompany }
  } catch (error) {
    return { success: false, error: `An error occurred: ${error}` }
  }
}

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

export const createMany = async (
  users: BulkUser[],
): Promise<Result<BulkUser[]>> => {
  // const existingUser = await findUser(user.email)
  // if (existingUser) {
  //   return {
  //     success: false,
  //     type: "User.Duplicate",
  //     error: `User with email ${user.email} already exists.`,
  //   }
  // }

  const createdUsers = (await createManyUsers(users)) as BulkUser[]

  console.log("Fixing agreement type: " + createdUsers[0].agreementType)

  if (createdUsers == null) {
    return { success: false, error: "Failed to create users." }
  }

  return { success: true, data: createdUsers }
}

export const edit = async (
  email: string,
  user: IUser,
): Promise<Result<IUser>> => {
  const existingUser = await findUser(email)
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
