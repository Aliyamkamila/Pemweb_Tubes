// Lokasi: app/layout.js
import './globals.css';
import { Toaster } from 'sonner';
import { inter } from "./ui/fonts"; // Menggunakan font Inter

export const metadata = {
  title: "Penampungan Hewan",
  description: "Temukan sahabat baru Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}> {/* Menerapkan font Inter & antialiased */}
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}