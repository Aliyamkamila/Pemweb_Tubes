import Google from "next-auth/providers/google";

/**
 * Berisi daftar provider autentikasi (misalnya, Google, GitHub).
 * Konfigurasi ini dapat diimpor oleh file auth.js utama.
 */
export const authProviderConfigList = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Tambahkan provider lain di sini jika perlu (misalnya, GitHub, Facebook)
  ],
  pages: {
    signIn: '/login', // Tentukan halaman login kustom Anda
  },
  callbacks: {
    // Callback 'authorized' sangat penting untuk integrasi dengan Middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect pengguna yang tidak login
      } else if (isLoggedIn) {
        // Jika pengguna sudah login, Anda bisa redirect mereka dari halaman login
        // return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
};
