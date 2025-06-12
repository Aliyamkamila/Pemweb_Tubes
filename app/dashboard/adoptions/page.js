import { Suspense } from "react";
import Pagination from "@/app/ui/dashboard/pets/pagination";
import Search from "@/app/ui/search";
import { opensans } from "@/app/ui/fonts";
import { PetsTableSkeleton } from "@/app/ui/skeletons"; // Kita bisa gunakan skeleton yang ada
import { fetchContactMessagesPages } from "@/app/lib/data/contact/messages"; // Fungsi baru yang Anda buat
import AdoptionsTable from "@/app/ui/dashboard/adoptions/table"; // Komponen tabel baru yang Anda buat

export default async function Page({ searchParams }) {
  // Mengambil query pencarian dan halaman dari URL
  const { query = "", page = "1" } = searchParams;
  const currentPage = Number(page);

  // Menghitung total halaman untuk pagination
  const totalPages = await fetchContactMessagesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${opensans.className} text-2xl`}>Pesan Adopsi</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari nama, email, atau pesan..." />
      </div>

      {/* Menampilkan tabel dengan loading state (Suspense) */}
      <Suspense
        key={query + currentPage}
        fallback={<PetsTableSkeleton />}
      >
        <AdoptionsTable query={query} currentPage={currentPage} />
      </Suspense>

      {/* Tombol pagination di bawah tabel */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}