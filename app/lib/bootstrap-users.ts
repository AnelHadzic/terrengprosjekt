import { IUser } from "./interface/IUser";

export const systemUsers = () => {
  const users = [{
    email: "mariusca@hiof.no",
    firstname: "Marius Christian",
    lastname:"Aastebøl",
  }] as IUser[];
  

  return users;
};