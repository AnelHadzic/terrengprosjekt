export interface IUser{
    email: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
    created?: Date,
    token?: string,
    role?: number,
    companyId?: string,
    carRegNumbers?: string[],
    primaryCarRegNumber?: string
  }