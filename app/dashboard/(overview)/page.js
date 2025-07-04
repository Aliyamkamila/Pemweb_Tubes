import { fetchCardData } from "@/app/lib/data/pets/pet";
import CardWrapper from "@/app/ui/dashboard/cards";
import LatestPets from "@/app/ui/dashboard/latest-pets";
import { Suspense } from "react";
import { LatestPetsSkeleton, CardsSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      {/* DIUBAH: Menyamakan style judul */}
      <h1 className="mb-8 font-serif text-3xl font-bold text-darkBrown">
        Dasbor
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestPetsSkeleton />}>
          <LatestPets />
        </Suspense>
      </div>
    </main>
  );
}