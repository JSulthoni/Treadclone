import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";


export const authOptions = {
    // Adding prisma adapter
    adapter: PrismaAdapter(prisma),
    // Enabling debug messages for authentication and database operations
    debug: false,
    // Adding secret
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      // ...add more providers heres
    ]
};
  
export const getAuthSession = () => getServerSession(authOptions);
