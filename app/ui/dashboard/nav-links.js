"use client";
import {
  HomeIcon,
  ListBulletIcon,
  EnvelopeIcon, // Icon untuk "Users" sudah dihapus
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Array links tanpa "Users"
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Pets",
    href: "/dashboard/pets",
    icon: ListBulletIcon,
  },
  {
    name: "Pesan Adopsi",
    href: "/dashboard/adoptions",
    icon: EnvelopeIcon,
  },
];

export default function NavLinks({ userRole }) {
  const pathname = usePathname();

  // Filter hanya memeriksa link yang tersisa
  const filteredLinks = links.filter((link) => {
    // Tentukan link mana saja yang hanya untuk admin
    const isAdminOnlyLink = link.name === "Pesan Adopsi";

    // Jika pengguna bukan admin dan linknya adalah admin-only, jangan tampilkan
    if (userRole !== "admin" && isAdminOnlyLink) {
      return false;
    }

    // Tampilkan semua link lainnya
    return true;
  });

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium border hover:border-slate-400 lg:flex-none lg:justify-start lg:p-2 lg:px-3",
              {
                "bg-slate-200 text-slate-900 border-none":
                  pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden lg:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
