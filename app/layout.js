import "./globals.css";
import { inter } from "./ui/fonts";

export const metadata = {
  title: "Penampungan Hewan",
  description: "Temukan sahabat baru Anda.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
