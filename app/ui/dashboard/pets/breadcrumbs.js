// Lokasi: app/ui/dashboard/pets/breadcrumbs.js

import { clsx } from "clsx";
import Link from "next/link";
// Impor font tidak lagi diperlukan di sini agar konsisten dengan layout utama
// import { opensans } from "@/app/ui/fonts";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol
        className={clsx(
          // Menghapus font spesifik agar menggunakan font default dari layout (Inter)
          "flex flex-wrap text-sm sm:text-base"
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={clsx(
              "flex items-center",
              // PERUBAHAN WARNA DI SINI:
              // Link aktif dibuat lebih tebal dan berwarna gelap.
              // Link non-aktif diberi warna lebih pudar agar tidak terlalu menonjol.
              breadcrumb.active
                ? "font-semibold text-darkBrown"
                : "text-darkBrown/70"
            )}
          >
            <Link href={breadcrumb.href} className="hover:text-darkBrown transition-colors">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              // PERUBAHAN WARNA SEPARATOR
              <span className="mx-2 text-darkBrown/50">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}