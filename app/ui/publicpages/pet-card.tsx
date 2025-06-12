import { fetchFilteredPublishedPetsWithCategory } from "@/app/lib/data/pets/public";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "@/app/lib/utils/image-loading-placeholder";

// 1. Definisikan tipe untuk objek 'pet'
type Pet = {
  id: string;
  name: string;
  city: string;
  state: string;
  petImages: {
    url: string;
  }[];
};

export default async function PetCard({
  query,
  currentPage,
  speciesName,
}: {
  query: string;
  currentPage: number;
  speciesName: string;
}) {
  const pets = await fetchFilteredPublishedPetsWithCategory(
    query,
    currentPage,
    speciesName,
  );

  return (
    <div className="mt-6 flex gap-3 flex-wrap">
      {/* 2. Terapkan tipe 'Pet' pada parameter 'pet' */}
      {pets?.map((pet: Pet) => (
        <div
          key={pet.id}
          className="bg-white relative border border-gray-200 p-4 shadow-sm rounded-md w-40 flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-md"
        >
          <Link href={`/pets/${pet.id}`} className="block">
            <div className="w-full">
              {pet.petImages && pet.petImages.length > 0 ? (
                <Image
                  src={pet.petImages[0].url}
                  alt={`Foto ${pet.name}`}
                  width={300}
                  height={300}
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(300, 300),
                  )}`}
                  className="rounded-md w-28 h-28 object-cover"
                />
              ) : (
                <div className="w-28 h-28 bg-gray-200 rounded-md flex items-center justify-center">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="mt-2 text-center">
                <p className="font-medium w-28 overflow-hidden truncate text-darkBrown">
                  {pet.name}
                </p>
                <h2 className="text-sm text-gray-600">{`${pet.city}, ${pet.state}`}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}