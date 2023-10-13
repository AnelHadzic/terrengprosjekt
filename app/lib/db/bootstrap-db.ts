import { systemUsers } from "./bootstrap-users"
import { User, createUser } from "../model/user"
import { systemCompanies } from "./bootstrap-company"
import { Company, createCompany } from "../model/company"
import { ParkingLot, createParkingLot } from "../model/parkinglot"
import { systemParkings } from "./bootstrap-parkings"

const createAdminUsers = async () => {
  const users = await User.find()
  if (users.length === 0) {
    const init = systemUsers()
    init.forEach(async (x) => {
      await createUser(x)
    })
  }
}

const createCompanies = async () => {
  const users = await Company.find()
  if (users.length === 0) {
    const init = systemCompanies()
    init.forEach((x) => {
      createCompany(x)
    })
  }
}

const createParkingLots = async () => {
  const parkingLots = await ParkingLot.find()
  if (parkingLots.length === 0) {
    const init = systemParkings()
    init.forEach((x) => {
      createParkingLot(x)
    })
  }
}

function bootstrapDb() {
  createAdminUsers()
  createCompanies()
  createParkingLots()
}

export default bootstrapDb
