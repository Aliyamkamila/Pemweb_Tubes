import { fetchFrontPagePetById } from "@/app/lib/data/pets/public";
import { PetGallery } from "@/app/ui/publicpages/pet-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeartIcon, MapPinIcon } from "@heroicons/react/24/solid";

// Komponen kecil untuk menampilkan detail fisik (Usia, Berat, Tinggi)
const PetAttribute = ({ label, value, unit }) => (
  <div className="bg-darkBrown/5 rounded-lg p-4 text-center">
    <span className="block text-xs text-darkBrown/70">{label}</span>
    <span className="block text-xl font-bold text-darkBrown">
      {value} <span className="text-base font-normal">{unit}</span>
    </span>
  </div>
);

// Komponen utama halaman
export default async function Page({ params }) {
  const { id } = params;
  const pet = await fetchFrontPagePetById(id);

  if (!pet) {
    notFound();
  }

  return (
    <main className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-darkBrown/10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Kolom Kiri: Galeri Foto */}
        <div className="lg:col-span-3">
          <PetGallery images={pet.petImages} />
        </div>

        {/* Kolom Kanan: Detail Informasi */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Nama dan Lokasi */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-warmPeach">
              {pet.name}
            </h1>
            {pet.city && pet.state && (
              <div className="mt-2 flex items-center gap-2 text-sm text-darkBrown/80">
                <MapPinIcon className="w-4 h-4" />
                <span>{`${pet.city}, ${pet.state}`}</span>
              </div>
            )}
          </div>

          {/* Atribut Fisik */}
          <div className="grid grid-cols-3 gap-4">
            {pet.age && <PetAttribute label="Usia" value={pet.age} unit="thn" />}
            {pet.weight && <PetAttribute label="Berat" value={pet.weight} unit="kg" />}
            {pet.height && <PetAttribute label="Tinggi" value={pet.height} unit="cm" />}
          </div>

          {/* Kategori dan Deskripsi */}
          <div className="space-y-4 pt-4 border-t border-darkBrown/10">
            {pet.species?.name && (
              <div>
                <span className="block text-sm font-semibold text-darkBrown">Kategori:</span>
                <span className="text-darkBrown/90">{pet.species.name}</span>
              </div>
            )}
            {pet.description && (
              <div>
                <span className="block text-sm font-semibold text-darkBrown">Tentang {pet.name}:</span>
                <p className="mt-1 text-darkBrown/90 leading-relaxed">
                  {pet.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Tombol Aksi Adopsi */}
          <div className="pt-4 flex-grow flex items-end">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-3 rounded-lg bg-warmPeach py-3 px-6 text-center font-bold text-darkBrown shadow-md hover:bg-opacity-90 transition-transform hover:scale-105"
            >
              <HeartIcon className="w-6 h-6" />
              <span>Adopsi Saya!</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}