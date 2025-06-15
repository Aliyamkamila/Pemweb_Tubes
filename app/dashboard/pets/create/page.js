import CreatePetForm from "@/app/ui/dashboard/pets/create-form";
import Breadcrumbs from "@/app/ui/dashboard/pets/breadcrumbs";
import { fetchAdoptionStatusList } from "@/app/lib/data/pets/pet";
import { fetchSpecies } from "@/app/lib/data/pets/public";

export default async function Page() {
  const speciesList = await fetchSpecies();
  const adoptionStatusList = await fetchAdoptionStatusList();

  return (
    <main className="px-4 py-6 md:px-8 lg:px-16 max-w-5xl mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Manajemen Hewan",
            href: "/dashboard/pets",
          },
          {
            label: "Tambah Data Hewan Baru",
            href: "/dashboard/pets/create",
            active: true,
          },
        ]}
        className="text-darkBrown font-semibold" // pastikan darkBrown-nya terdaftar
      />
      <CreatePetForm
        speciesList={speciesList}
        adoptionStatusList={adoptionStatusList}
      />
    </main>
  );
}
