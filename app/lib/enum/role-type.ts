export enum RoleEnum {
  Unknown = 0,
  Admin = 1,
  Customer = 2,
  Inspector = 3,
  CompanyAdmin = 4,
}

export const Role: typeof RoleEnum = {
  Unknown: RoleEnum.Unknown,
  Admin: RoleEnum.Admin,
  Customer: RoleEnum.Customer,
  Inspector: RoleEnum.Inspector,
  CompanyAdmin: RoleEnum.CompanyAdmin,
}

export const Roles = [
  RoleEnum.Unknown,
  RoleEnum.Admin,
  RoleEnum.Customer,
  RoleEnum.Inspector,
  RoleEnum.CompanyAdmin,
]
