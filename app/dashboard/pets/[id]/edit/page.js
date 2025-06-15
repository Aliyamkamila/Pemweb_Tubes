// Lokasi: app/dashboard/pets/[id]/edit/page.js

import { notFound } from "next/navigation";
import { fetchPetById, fetchAdoptionStatusList } from "@/app/lib/data/pets/pet";
import { fetchSpecies } from "@/app/lib/data/pets/public";
import EditPetForm from "@/app/ui/dashboard/pets/edit-form";
import Breadcrumbs from "@/app/ui/dashboard/pets/breadcrumbs";

export default async function Page({ params }) {
  const { id } = params;
  const [pet, speciesList, adoptionStatusList] = await Promise.all([
    fetchPetById(id),
    fetchSpecies(),
    fetchAdoptionStatusList(),
  ]);

  if (!pet) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Manajemen Hewan", href: "/dashboard/pets" },
          {
            label: "Edit Data Hewan",
            href: `/dashboard/pets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPetForm
        pet={pet}
        speciesList={speciesList}
        adoptionStatusList={adoptionStatusList}
      />
    </main>
  );
}