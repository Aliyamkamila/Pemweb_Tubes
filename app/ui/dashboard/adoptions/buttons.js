"use client";

import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";       // ✅ untuk state & effect
import { useFormState } from "react-dom";          // ✅ khusus useFormState
import { updateContactStatus, deleteContactMessage } from "@/app/lib/actions/contact";


// Tombol untuk mengarahkan ke halaman edit
export function EditMessage({ id }) {
    return (
        <Link
            href={`/dashboard/adoptions/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

// Komponen untuk mengubah status
export function UpdateStatus({ message }) {
  const initialState = { message: null };
  // UBAH BARIS INI: Gunakan useFormState
  const [state, formAction] = useFormState(updateContactStatus, initialState); // <--- Ini sudah benar: useFormState
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.message) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={message.id} />
      <select
        name="status"
        defaultValue={message.status}
        className="rounded-md border border-gray-200 py-1 pl-2 pr-7 text-sm"
      >
        <option value="Belum dihubungi">Belum dihubungi</option>
        <option value="Sudah dihubungi">Sudah dihubungi</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-darkBrown px-3 py-1 text-sm text-white hover:bg-opacity-90"
      >
        Update
      </button>
      {showSuccess && (
         <CheckIcon className="h-5 w-5 text-green-500" />
      )}
    </form>
  );
}

// Komponen untuk menghapus pesan
export function DeleteMessage({ id }) {
    const deleteMessageWithId = deleteContactMessage.bind(null, id);

    return (
        <form action={deleteMessageWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}