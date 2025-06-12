import { auth } from './auth'; // <-- Impor dari auth.js utama

export default auth;

// Filter Middleware untuk menentukan rute mana yang dilindunginya.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
