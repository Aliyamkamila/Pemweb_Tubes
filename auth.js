import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/lib/prisma";
import { z } from 'zod';
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import authConfig from "./auth.config";

async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          // --- PERUBAHAN UTAMA ADA DI SINI ---
          // Cek apakah password cocok DAN perannya adalah 'admin'
          if (passwordsMatch && user.role === 'admin') {
            return user; // Izinkan login jika user adalah admin
          }
        }
        
        console.log('Invalid credentials or not an admin.');
        return null; // Tolak login jika password salah ATAU bukan admin
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});