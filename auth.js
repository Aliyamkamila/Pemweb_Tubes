import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/lib/prisma";
import { z } from 'zod';
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { authProviderConfigList } from "./auth.config";

// Fungsi untuk mengambil data pengguna dari database
async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Konfigurasi untuk provider login Kredensial (email/password)
const credentialsConfig = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Kata Sandi', type: 'password' },
  },
  authorize: async (credentials) => {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      const user = await getUser(email);
      if (!user || !user.password) return null;
      
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) return user;
    }
    return null;
  },
});

// Konfigurasi utama dan satu-satunya untuk NextAuth.js
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Menggunakan PrismaAdapter untuk menyimpan sesi dan pengguna di database
  adapter: PrismaAdapter(prisma),

  // Saat menggunakan adapter, strategi default adalah 'database', jadi tidak perlu didefinisikan
  // Hapus baris: session: { strategy: "jwt" }
  
  callbacks: {
    // Dengan strategi 'database', objek 'user' dari database tersedia 
    // langsung di callback sesi. Callback 'jwt' tidak digunakan.
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role; // Pastikan model User di Prisma memiliki kolom 'role'
      }
      return session;
    },
    // Menambahkan callback `authorized` untuk digunakan oleh Middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect pengguna yang tidak login ke halaman login
      } else if (isLoggedIn) {
        // Jika pengguna sudah login dan mencoba mengakses halaman login/register,
        // redirect mereka ke dashboard. (Opsional, tapi praktik yang baik)
        // return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  
  // Daftar semua provider autentikasi
  providers: [...authProviderConfigList.providers, credentialsConfig],
  
  // Menentukan halaman login kustom
  pages: {
    signIn: '/login', // Jika Anda punya halaman login kustom di /app/login/page.js
  },
});
