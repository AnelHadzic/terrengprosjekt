export enum RoleEnum {
  Unknown = 0,
  Admin = 1,
  Customer = 2,
  Inspector = 3,
  CompanyManager = 4,
}

export const Role: typeof RoleEnum = {
  Unknown: RoleEnum.Unknown,
  Admin: RoleEnum.Admin,
  Customer: RoleEnum.Customer,
  Inspector: RoleEnum.Inspector,
  CompanyManager: RoleEnum.CompanyManager,
}

export const Roles = [
  RoleEnum.Unknown,
  RoleEnum.Admin,
  RoleEnum.Customer,
  RoleEnum.Inspector,
  RoleEnum.CompanyManager,
]
