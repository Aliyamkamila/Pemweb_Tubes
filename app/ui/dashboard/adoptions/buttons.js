'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteContactMessage } from '@/app/lib/actions/contact';
import { toast } from 'sonner';

// Tombol untuk mengarahkan ke halaman edit status
export function UpdateMessageStatus({ id }) {
  return (
    <Link
      href={`/dashboard/adoptions/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 transition-colors"
      aria-label="Ubah status pesan"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// Tombol untuk menghapus pesan
export function DeleteMessage({ id }) {
  // Bind ID ke server action
  const deleteActionWithId = async () => {
    const result = await deleteContactMessage(id);
    if (result?.message.includes("berhasil")) {
        toast.success(result.message);
    } else if (result?.message) {
        toast.error(result.message);
    }
  };

  return (
    <form action={deleteActionWithId}>
      <button 
        className="rounded-md border p-2 hover:bg-gray-100 text-red-500 hover:text-red-700 transition-colors"
        aria-label="Hapus pesan"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
