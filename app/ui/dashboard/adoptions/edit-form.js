// File: app/ui/dashboard/adoptions/edit-form.js
"use client"

import { useActionState } from 'react';
import { updateContactMessage } from '@/app/lib/actions/contact';
import {
    UserCircleIcon,
    AtSymbolIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
  } from '@heroicons/react/24/outline';

export default function EditContactForm({ message }) {
    const initialState = { message: null, errors: {} };
    const updateMessageWithId = updateContactMessage.bind(null, message.id);
    const [state, formAction] = useActionState(updateMessageWithId, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6 mt-4">
                {/* Nama Pengirim */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">Nama</label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={message.name}
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={message.email}
                        />
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Nomor Telepon */}
                <div className="mb-4">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">No. Telepon</label>
                    <div className="relative">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={message.phone}
                        />
                        <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Isi Pesan */}
                <div className="mb-4">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">Pesan</label>
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={message.message}
                        />
                        <ChatBubbleLeftRightIcon className="pointer-events-none absolute left-3 top-3.5 h-[18px] w-[18px] text-gray-500" />
                    </div>
                </div>

                 {/* Menampilkan error jika ada */}
                <div aria-live="polite" aria-atomic="true">
                    {state.message ? (<p className="mt-2 text-sm text-red-500">{state.message}</p>) : null}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <a
                    href="/dashboard/adoptions"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Batal
                </a>
                <button type="submit" className="flex h-10 items-center rounded-lg bg-darkBrown px-4 text-sm font-medium text-white transition-colors hover:bg-opacity-90">Simpan Perubahan</button>
            </div>
        </form>
    );
}