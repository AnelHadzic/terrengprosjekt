import mongoose, { Schema } from "mongoose"
import { Role, Roles } from "../../enum/role-type"
export { createUser } from "./create"
export { createManyUsers } from "./createMany"
export { findAllUsers } from "./findAll"
export { findUsersByCompanyId } from "./findByCompany"
export { findUsersByCompanyIdAndMultiSearch } from "./findByCompanyAndMultiSearch"
export { findUsersByMultiSearch } from "./findByMultiSearch"
export { findUser } from "./findOne"
export { editUser } from "./edit"
export { deleteUser } from "./delete"

const schema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  phone: String,
  created: { type: Date, default: Date.now },
  token: String,
  role: {
    type: Number,
    enum: Roles,
    default: Role.Unknown,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  carRegNumbers: [String],
  primaryCarRegNumber: String,
})

export const User = mongoose.models.User || mongoose.model("User", schema)
