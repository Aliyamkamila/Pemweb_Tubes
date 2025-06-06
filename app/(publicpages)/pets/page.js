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
  const { page = "1", category = "", query = "" } = await searchParams;
  const speciesName = category;
  const currentPage = Number(page);

  // get the total number of pages
  const totalPages = await fetchPublishedPetsPagesWithCategory(
    query,
    speciesName
  );

  // get the list of species
  const speciesList = await fetchSpecies();

  return (
    <div className="p-6 sm:p-10 bg-beige min-h-screen text-darkBrown font-sans">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-warmPeach">
          Daftar Hewan
        </h1>
        <p className="text-sm text-beige">Saat ini tersedia untuk diadopsi</p>
      </div>
     
      {/* Search & Category */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* search bar */}
        <div className="sm:w-1/2">
          <Search placeholder="Cari nama hewan..." />
        </div>

        {/* category option */}
        <CategoryList species={speciesList} speciesName={speciesName} />
      </div>
      {/* pets card */}
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
      {/* pagination */}
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
