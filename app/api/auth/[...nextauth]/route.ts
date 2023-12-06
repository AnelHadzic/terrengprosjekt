import NextAuth from "next-auth/next"
import { options } from "./options"
import { NextApiRequest, NextApiResponse } from "next"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const userAgent = req.headers["user-agent"]

  if (
    req.method === "HEAD" ||
    (userAgent && /lua-resty-http.+ngx_lua/.test(userAgent))
  ) {
    console.log("Bot detected")
    return res.status(200).end()
  }
  return await NextAuth(req, res, options)
}
