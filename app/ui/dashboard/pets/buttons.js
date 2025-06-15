"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// Tambahkan baris ini untuk mengimpor server action 'deletePet'
import { deletePet } from "@/app/lib/actions/pet";

// Tombol CreatePet diubah warnanya agar lebih menonjol
export function CreatePet() {
  return (
    <Link
      href="/dashboard/pets/create"
      className="flex h-10 items-center rounded-lg bg-warmPeach px-4 text-sm font-medium text-darkBrown transition-colors hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warmPeach"
    >
      <span className="hidden md:block">Tambah Hewan</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// Tombol UpdatePet menggunakan style border yang netral
export function UpdatePet({ id }) {
  return (
    <Link
      href={`/dashboard/pets/${id}/edit`}
      className="rounded-md border p-2 text-darkBrown hover:bg-darkBrown/10"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// Tombol DeletePet diberi warna merah untuk menandakan aksi berbahaya
export function DeletePet({ id }) {
  // Bind ID ke server action
  const deletePetWithId = deletePet.bind(null, id);

  return (
    <form action={deletePetWithId}>
      <button className="rounded-md border p-2 text-red-600 hover:bg-red-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}