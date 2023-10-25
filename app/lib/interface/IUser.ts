export interface IUser{
    email: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
    created?: Date,
    token?: string,
    role?: number,
    company?: string,
    carRegNumbers?: string[],
    primaryCarRegNumber?: string
  }