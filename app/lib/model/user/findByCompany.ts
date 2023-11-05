import { User } from "."
import mongoose from 'mongoose';
export async function findUsersByCompanyId(companyId: string) {
  const mongooseId = new mongoose.Types.ObjectId(companyId)

  const session = await User.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "companyInfo",
      },
    },
    {
      $match: {
        $or: [
          { company: mongooseId},
        ],
      },
    },
    {
      $unwind: "$companyInfo",
    },
  ])

  if (session) {
    return session
  }

  return null
}