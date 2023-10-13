import { IUser } from "../interface/IUser"

export const systemUsers = () => {
  const users = [
    {
      email: "mariusca@hiof.no",
      firstname: "Marius Christian",
      lastname: "Aastebøl",
      phone: "12345678",
      companyId: "0",
      carRegNumbers: ["HJ73642"],
      primaryCarRegNumber: "HJ73642",
    },
    {
      email: "anel@hiof.no",
      firstname: "Anel",
      lastname: "Hadzic",
      phone: "87654321",
      companyId: "0",
      carRegNumbers: ["AE23642"],
      primaryCarRegNumber: "AE23642",
    },
    {
      email: "jorgen.braekke@soprasteria.com",
      firstname: "Jørgen",
      lastname: "Brække",
      phone: "12344321",
      companyId: "0",
      carRegNumbers: ["FD21334"],
      primaryCarRegNumber: "FD21334",
    },
  ] as IUser[]

  return users
}
