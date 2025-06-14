// app/layout.js
import './globals.css';
import { Toaster } from 'sonner'; // Pastikan ini diimpor
import { inter } from "./ui/fonts"; // Ganti dengan font yang Anda gunakan

export const metadata = {
  title: "Penampungan Hewan",
  description: "Temukan sahabat baru Anda.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}> {/* Pastikan className font diterapkan */}
        {children}
        <Toaster position="top-center" richColors /> {/* Ini SANGAT PENTING */}
      </body>
    </html>
  );
}