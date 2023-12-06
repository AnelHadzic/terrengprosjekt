import NextAuth from "next-auth/next"
import { options } from "./options"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "HEAD") {
    return res.status(200).end()
  }

  return await NextAuth(req, res, options)
}
