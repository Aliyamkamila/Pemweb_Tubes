import Pagination from "@/app/ui/dashboard/pets/pagination";
import Search from "@/app/ui/search";
import PetsTable from "@/app/ui/dashboard/pets/table";
import { CreatePet } from "@/app/ui/dashboard/pets/buttons";
import { opensans } from "@/app/ui/fonts";
import { PetsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPetsPages } from "@/app/lib/data/pets/pet";

export default async function Page({ searchParams }) {
    const { query = "", page = "1" } = searchParams;
    const currentPage = Number(page);
    const totalPages = await fetchPetsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${opensans.className} text-2xl`}>Daftar Hewan</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Cari hewan..." />
                <CreatePet />
            </div>

            <Suspense
                key={query + currentPage}
                fallback={<PetsTableSkeleton />}
            >
                <PetsTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}