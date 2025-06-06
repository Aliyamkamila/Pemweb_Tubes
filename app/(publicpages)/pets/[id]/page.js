import { fetchFrontPagePetById } from "@/app/lib/data/pets/public";
import { PetGallery } from "@/app/ui/publicpages/pet-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";

// Main Page Component
export default async function Page({ params }) {
  // Destructure 'id' directly from params
  const { id } = params;

  // Fetch pet data
  const pet = await fetchFrontPagePetById(id);

  // If pet not found, render 404 page
  if (!pet) {
    notFound();
  }

  return (
    <main className="p-6 sm:p-12 font-sans text-darkBrown bg-beige rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Pet Gallery */}
        <PetGallery images={pet.petImages} />

        {/* Pet Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-warmPeach">{pet.name}</h1>
          {/* Ensure pet.city and pet.state exist before displaying */}
          {pet.city && pet.state && (
            <div className="text-sm text-darkBrown">{`${pet.city}, ${pet.state}`}</div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            {/* Conditional rendering for PetDetail components to avoid displaying "null" or "undefined" */}
            {pet.age && <PetDetail label="Usia" value={pet.age} />}
            {pet.weight && <PetDetail label="Berat" value={pet.weight} />}
            {pet.height && <PetDetail label="Tinggi" value={pet.height} />}
            {pet.species?.name && (
              <PetDetail label="Kategori" value={pet.species.name} />
            )}
            {pet.description && (
              <div className="col-span-2 sm:col-span-1">
                <PetDetail label="Deskripsi" value={pet.description} />
              </div>
            )}
          </div>

          <div className="mt-4">
            <Link
              href="/contact"
              className="bg-beige text-darkBrown hover:bg-warmPeach px-7 py-2 rounded text-sm font-medium border border-darkBrown/10 shadow-sm"
            >
              Adopsi
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// PetDetail component
const PetDetail = ({ label, value }) => (
  <div>
    {/* Changed text-beige to text-darkBrown for better contrast */}
    <span className="block text-sm font-semibold text-darkBrown">{label}:</span>
    <span className="text-darkBrown text-sm">{value}</span>
  </div>
);