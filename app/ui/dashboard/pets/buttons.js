"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { updateContactStatus, deleteContactMessage } from "@/app/lib/actions/contact";

/**
 * Komponen dropdown untuk mengubah status pesan kontak.
 * Menerima objek 'message' yang berisi id dan status saat ini.
 */
export function UpdateStatus({ message }) {
  // Fungsi ini akan dipanggil setiap kali nilai dropdown berubah.
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    // Memanggil server action untuk memperbarui status di database.
    await updateContactStatus(message.id, newStatus);
  };

  return (
    <select
      defaultValue={message.status}
      onChange={handleStatusChange}
      className={`rounded-full px-2 py-1 text-xs border cursor-pointer ${
        message.status === 'Sudah dihubungi'
          ? 'bg-green-200 text-green-700 border-green-300 hover:bg-green-300'
          : 'bg-yellow-200 text-yellow-800 border-yellow-300 hover:bg-yellow-300'
      }`}
    >
      <option value="Belum dihubungi">Belum dihubungi</option>
      <option value="Sudah dihubungi">Sudah dihubungi</option>
    </select>
  );
}

/**
 * Komponen tombol untuk menghapus pesan kontak.
 * Menerima 'id' dari pesan yang akan dihapus.
 */
export function DeleteMessage({ id }) {
    // Mengikat 'id' ke dalam fungsi server action `deleteContactMessage`.
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