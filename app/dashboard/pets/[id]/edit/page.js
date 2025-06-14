// app/ui/dashboard/adoptions/[id]/edit/page.js
import { notFound } from "next/navigation";
import { getMessageById } from "@/app/lib/data/contact"; // Pastikan ini ada
import { updateContactMessage } from "@/app/lib/actions/contact"; // Fungsi update
import Breadcrumbs from "@/app/ui/dashboard/adoptions/breadcrumbs";

export default async function Page({ params }) {
  const { id } = params;
  const message = await getMessageById(id);

  if (!message) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Adopsi", href: "/dashboard/adoptions" },
          {
            label: "Edit Pesan",
            href: `/dashboard/adoptions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <h2 className="text-base font-semibold leading-7 text-gray-900 mb-4">
        Edit Pesan Kontak
      </h2>

      <form action={updateContactMessage} className="space-y-4">
        <input type="hidden" name="id" value={message.id} />

        <div>
          <label className="block text-sm font-medium">Nama</label>
          <input
            name="name"
            defaultValue={message.name}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            defaultValue={message.email}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">No HP (Opsional)</label>
          <input
            name="phone"
            defaultValue={message.phone || ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Pesan</label>
          <textarea
            name="message"
            defaultValue={message.message}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-darkBrown text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Simpan Perubahan
        </button>
      </form>
    </main>
  );
}
