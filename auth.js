import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/lib/prisma";
import { z } from 'zod';
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { authProviderConfigList } from "./auth.config";

// get user from db
async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// credentials setup for admin email/password login
const credentialsConfig = Credentials({
  // The credentials object is used to define the fields used to log in
  credentials: {
    email: {
      label: 'Email',
      type: 'email',
    },
    password: {
      label: 'Kata Sandi',
      type: 'password',
    },
  },
  // The authorize callback validates credentials
  authorize: async (credentials) => {
    // Validate the credentials for the user
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials);

    // If the credentials are valid, return the user object
    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
    
      const user = await getUser(email);
      
      // If user does not exist or password is missing, throw an error
      if (!user || !user.password) return null;
      
      const passwordsMatch = await bcrypt.compare(password, user.password);

      // If the password is correct, return the user object
      if (passwordsMatch) return user;
    }
    return null;
  },
})

// auth config
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.user.role = token.role;
      return session;
    },
  },
  session: { 
    strategy: "jwt",
  },
  providers: [...authProviderConfigList.providers, credentialsConfig ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);