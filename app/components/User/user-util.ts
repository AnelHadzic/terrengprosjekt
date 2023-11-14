import { RoleEnum } from "@/app/lib/enum/role-type"

const displayUserRole = (role: number | undefined) => {
  if (role == undefined) {
    return "Unknown"
  }
  
  if (RoleEnum[role] === "Admin") {
    return "Administrator"
  }

  if (RoleEnum[role] === "Customer") {
    return "Kunde"
  }

  if (RoleEnum[role] === "Inspector") {
    return "Inspektør"
  }

  if (RoleEnum[role] === "CompanyManager") {
    return "Bedriftsansvarlig"
  }
  return "Unknown"
}

export default displayUserRole
