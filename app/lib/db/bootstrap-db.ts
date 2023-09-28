
import { systemUsers } from "./bootstrap-users";
import { User, createUser } from "../model/user";
import { Company, createCompany } from "../model/company";
import { systemCompanies } from "./bootstrap-company";

const createAdminUsers = async () => {
  
  const users = await User.find();
  if (users.length === 0) {
    const init = systemUsers();
    init.forEach((x) => {
      createUser(x);
    });
  }
};

const createCompanies = async () => {
  
  const users = await Company.find();
  if (users.length === 0) {
    const init = systemCompanies();
    init.forEach((x) => {
      createCompany(x);
    });
  }
};

function bootstrapDb() {
  createAdminUsers();
  createCompanies();
}

export default bootstrapDb;