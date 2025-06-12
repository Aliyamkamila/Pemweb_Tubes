import { Suspense } from "react";
import Search from "../../ui/search";
import { FrontPetsCardSkeleton } from "../../ui/skeletons";
import {
  fetchPublishedPetsPagesWithCategory,
  fetchSpecies,
} from "@/app/lib/data/pets/public";
import Pagination from "@/app/ui/dashboard/pets/pagination";
import PetCard from "@/app/ui/publicpages/pet-card";
import CategoryList from "@/app/ui/publicpages/category-list";

export default async function Page({ searchParams }) {
  const { page = "1", category = "", query = "" } = searchParams;
  const speciesName = category;
  const currentPage = Number(page);

  // Mengambil total halaman dan daftar spesies dari server
  const totalPages = await fetchPublishedPetsPagesWithCategory(
    query,
    speciesName
  );
  const speciesList = await fetchSpecies();

  return (
    <div className="bg-beige min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Halaman: Judul, Subtitel, dan Kontrol Filter */}
        <header className="border-b border-darkBrown/10 pt-10 pb-6">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-darkBrown">
            Daftar Hewan
          </h1>
          <p className="mt-2 text-base text-darkBrown/70">
            Temukan sahabat baru Anda yang menunggu untuk diadopsi.
          </p>
        </header>

        {/* Konten Utama: Filter, Daftar Hewan, dan Paginasi */}
        <section className="pt-6 pb-24">
          {/* Kontrol Filter: Search dan Kategori */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full sm:w-1/2">
              <Search placeholder="Cari nama hewan..." />
            </div>
            <div className="w-full sm:w-auto">
              <CategoryList species={speciesList} speciesName={speciesName} />
            </div>
          </div>

          {/* Daftar Kartu Hewan */}
          <Suspense
            key={query + currentPage + speciesName}
            fallback={<FrontPetsCardSkeleton />}
          >
            <PetCard
              query={query}
              currentPage={currentPage}
              speciesName={speciesName}
            />
          </Suspense>

          {/* Tombol Paginasi */}
          <div className="mt-10 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </section>
      </main>
    </div>
  );
}