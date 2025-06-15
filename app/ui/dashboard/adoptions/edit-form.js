'use client';

import { CheckIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateContactMessageStatus } from '@/app/lib/actions/contact';

export default function EditMessageForm({ message }) {
  // Bind ID ke server action
  const updateMessageWithId = updateContactMessageStatus.bind(null, message.id);

  return (
    <form action={updateMessageWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Detail Pengirim (Read Only) */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Pengirim
          </label>
          <div className="relative">
            <input
              id="customer"
              className="peer block w-full cursor-not-allowed rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={message.name}
              readOnly
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Pilihan Status Pesan (DISEDERHANAKAN) */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Ubah status pesan
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-wrap gap-4">
              {/* Belum dihubungi */}
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="Belum dihubungi"
                  defaultChecked={message.status === 'Belum dihubungi'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label htmlFor="pending" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800">
                  Belum dihubungi <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              {/* Sudah dihubungi */}
              <div className="flex items-center">
                <input
                  id="contacted"
                  name="status"
                  type="radio"
                  value="Sudah dihubungi"
                  defaultChecked={message.status === 'Sudah dihubungi'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label htmlFor="contacted" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800">
                  Sudah dihubungi <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              {/* DIHAPUS: Opsi "Selesai" dihilangkan dari UI */}
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/adoptions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit">Ubah Status</Button>
      </div>
    </form>
  );
}
