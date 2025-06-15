// Lokasi: app/dashboard/adoptions/[id]/edit/page.js

import { notFound } from "next/navigation";
import { getMessageById } from "@/app/lib/data/contact";
import EditContactForm from "@/app/ui/dashboard/adoptions/edit-form"; // Akan kita gunakan form yang sudah ada
import Breadcrumbs from "@/app/ui/dashboard/adoptions/breadcrumbs"; // Pastikan breadcrumbs ini ada

export default async function Page({ params }) {
  const { id } = params;
  const message = await getMessageById(id);

  if (!message) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        items={[ // Pastikan prop yang digunakan 'items' atau sesuaikan
          { label: "Pesan Adopsi", href: "/dashboard/adoptions" },
          {
            label: "Edit Pesan",
            href: `/dashboard/adoptions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditContactForm message={message} />
    </main>
  );
}