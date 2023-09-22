export enum RoleEnum {
    Unknown = 0,
    Admin = 1,
    Customer = 2,
    Inspector = 3,
}

export const Role: typeof RoleEnum = {
    Unknown: RoleEnum.Unknown,
    Admin: RoleEnum.Admin,
    Customer: RoleEnum.Customer,
    Inspector: RoleEnum.Inspector,
};

export const Roles = [
    RoleEnum.Unknown,
    RoleEnum.Admin,
    RoleEnum.Customer,
    RoleEnum.Inspector,
];
