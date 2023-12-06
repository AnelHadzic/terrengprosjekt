import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/app/lib/db/clientPromise"
import { userIsAuthenticated } from "../../../features/other/isAuthorized"

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
      maxAge: 10 * 60,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userEmail = user.email
      console.log("Kjører signIn function")
      // Autentiserer brukeren
      const isValidUser = await userIsAuthenticated(userEmail)

      if (isValidUser) {
        console.log("isValidUser = true... Returnerer true fra options")
        return true
      } else {
        console.log(
          "isValidUser = false... Returnerer false fra options og redirect til uautorisert",
        )

        return "/uautorisert"
      }
    },
  },

  pages: {
    signIn: "/login",
    verifyRequest: "/emailSendt",
  },
}
