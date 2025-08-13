
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma"; // Adjust the path to your prisma client
import bcrypt from "bcryptjs"; // You'll need to install this: npm install bcryptjs

const handler = NextAuth({
  // The PrismaAdapter handles all database interactions for sessions and users
  adapter: PrismaAdapter(prisma),

  // Configure providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: "Login with Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // If no credentials are provided, return null
        if (!credentials) {
          return null;
        }

        // Use Prisma to find the user by their email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // If a user is found and the password is valid
        if (user && user.password && bcrypt.compareSync(credentials.password, user.password)) {
          // Return the user object to be saved in the session.
          // Note: Do not return the password hash.
          const { password, ...userWithoutPass } = user;

          return userWithoutPass as any;
        } else {
          // If the user is not found or password doesn't match, return null
          return null;
        }
      }
    })
  ],

  // To ensure the user ID is available in the session, you need to configure callbacks
  callbacks: {
    session: async ({ session, token }) => {
      // Add the user ID to the session object
      if (token.sub) {
       //@ts-expect-error: would be resolved later
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      // Add the user ID to the JWT
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },

  // You need to set the session strategy to "jwt" when using callbacks with credentials
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
