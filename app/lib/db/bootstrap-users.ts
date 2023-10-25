import { IUser } from "../interface/IUser"

export const systemUsers = () => {
  const users = [
    {
      email: "mariusca@hiof.no",
      firstname: "Marius Christian",
      lastname: "Aastebøl",
      phone: "12345678",
      role: 1,
      company: "652f74492b45acf167a7940a",
      carRegNumbers: ["HJ73642"],
      primaryCarRegNumber: "HJ73642",
    },
    {
      email: "anel@hiof.no",
      firstname: "Anel",
      lastname: "Hadzic",
      phone: "87654321",
      role: 1,
      company: "652f74492b45acf167a7940a",
      carRegNumbers: ["AE23642"],
      primaryCarRegNumber: "AE23642",
    },
    {
      email: "jorgen.braekke@soprasteria.com",
      firstname: "Jørgen",
      lastname: "Brække",
      role: 1,
      phone: "12344321",
      company: "652f74492b45acf167a7940a",
      carRegNumbers: ["FD21334"],
      primaryCarRegNumber: "FD21334",
    },
  ] as IUser[]

  return users
}
