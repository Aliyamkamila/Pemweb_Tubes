// Mengimpor fungsi 'auth' yang sudah dikonfigurasi dari auth.js
import { auth } from "./auth";

// Langsung ekspor 'auth' sebagai middleware default.
// Ini akan secara otomatis menggunakan callback 'authorized' dari auth.config.js
// untuk melindungi rute yang cocok.
export default auth;

// Konfigurasi ini tetap sama, untuk memastikan middleware hanya berjalan
// pada rute-rute di bawah /dashboard.
export const config = {
  matcher: ["/dashboard/:path*"],
};
