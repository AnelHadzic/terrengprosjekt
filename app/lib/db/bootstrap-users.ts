import { IUser } from "../interface/IUser";

export const systemUsers = () => {
  const users = [{
    email: "mariusca@hiof.no",
    firstname: "Marius Christian",
    lastname:"Aastebøl",
  },
  {
    email: "anel@hiof.no",
    firstname: "Anel",
    lastname:"Hadzic",
  },
  {
    email: "jorgen.braekke@soprasteria.com",
    firstname: "Jørgen",
    lastname:"Brække",
  }] as IUser[];
  

  return users;
};