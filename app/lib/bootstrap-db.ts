
import { systemUsers } from "./bootstrap-users";
import { User, createUser } from "./model/user";

const createAdminUsers = async () => {
  
  const users = await User.find();
  if (users.length === 0) {
    const init = systemUsers();
    init.forEach((x) => {
      createUser(x);
    });
  }
};

function bootstrapDb() {
  createAdminUsers();
}

export default bootstrapDb;