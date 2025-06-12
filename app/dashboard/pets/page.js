import Pagination from "@/app/ui/dashboard/pets/pagination";
import Search from "@/app/ui/search";
import PetsTable from "@/app/ui/dashboard/pets/table";
import { CreatePet } from "@/app/ui/dashboard/pets/buttons";
import { opensans } from "@/app/ui/fonts";
import { PetsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPetsPages } from "@/app/lib/data/pets/pet";

export default async function Page({ searchParams }) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPetsPages(query);

    return (
        <div className="w-full">
            {/* Header: Judul Halaman dan Tombol Aksi */}
            <div className="flex w-full items-center justify-between mb-6">
                <h1 className={`${opensans.className} text-3xl font-bold text-darkBrown`}>
                    Daftar Hewan
                </h1>
                <CreatePet />
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <Search placeholder="Cari nama hewan..." />
            </div>

            {/* Tabel Hewan dengan Suspense untuk Loading State */}
            <Suspense key={query + currentPage} fallback={<PetsTableSkeleton />}>
                <PetsTable query={query} currentPage={currentPage} />
            </Suspense>

            {/* Paginasi di bagian bawah */}
            <div className="mt-8 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}