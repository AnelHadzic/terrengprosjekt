import { User } from "."

export async function findUsersByMultiSearch(searchQuery: string) {
  const regex = new RegExp(searchQuery, "i")

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
          { email: regex },
          { firstname: regex },
          { lastname: regex },
          { phone: regex },
          { "companyInfo.companyName": regex },
          { carRegNumbers: { $in: [regex] } },
          { primaryCarRegNumber: regex },
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