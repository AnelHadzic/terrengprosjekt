import { User } from "."

export async function findAllUsers() {
  try {
    return await User.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyInfo",
        },
      },
      {
        $unwind: "$companyInfo",
      },
    ])
  } catch (error) {
    return null
  }
}
