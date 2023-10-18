import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/app/lib/db/clientPromise"
import { isCompanyUser, isExistingUser } from "./isAuthorized"

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userEmail = user.email

      // Hvis bruker eksisterer fra før...
      const userExists = await isExistingUser(userEmail)

      // Hvis det er en company user
      const emailExists = await isCompanyUser(userEmail)

      if (userExists === true) {
        return true
      } else if (emailExists === true) {
        return true
      } else {
        return "/uautorisert"
      }
    },
  },

  pages: {
    signIn: "/login",
    verifyRequest: "/emailSendt",
  },
}
