// Lokasi: app/ui/fonts.js

// 1. Impor semua font yang dibutuhkan dari next/font/google
import { Inter, Lusitana, Open_Sans } from 'next/font/google';

// 2. Definisikan dan ekspor setiap font

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const opensans = Open_Sans({
  weight: ['400', '600', '700'], // Sesuaikan weight sesuai kebutuhan
  subsets: ['latin'],
});