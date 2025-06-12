"use client"; // <--- TAMBAHKAN BARIS INI

import { deletePet } from '@/app/lib/actions/pet';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export function CreatePet() {
  return (
    <Link
      href="/dashboard/pets/create"
      className="flex h-10 items-center rounded-lg bg-teal-600 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      <span className="hidden md:block">Tambah Hewan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePet({ id }) {
  return (
    <Link
      href={`/dashboard/pets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePet({ id, name }) {
  const deletePetWithId = deletePet.bind(null, id);

  return (
    <form action={deletePetWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}