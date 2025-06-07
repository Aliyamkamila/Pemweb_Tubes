"use client";

import { useActionState } from "react";
import {
  IdentificationIcon,
  AtSymbolIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { createContactMessage } from "@/app/lib/actions/contact";

export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createContactMessage, initialState);

  return (
    <div className="bg-darkBrown py-10 px-4">
      <div className="mx-auto max-w-[40rem]">
        <h1 className="text-2xl font-serif text-warmPeach">Hubungi Kami</h1>
        <p className="text-sm font-sans text-beige">
          Kami akan menghubungi Anda secepat mungkin
        </p>

        <form action={formAction} className="pt-6 grid grid-cols-6 gap-x-6 gap-y-8">
          {/* Nama */}
          <div className="col-span-3">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-beige">
              Nama
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Masukkan nama"
                className="peer block w-full rounded-md bg-beige border border-darkBrown py-2 pl-10 text-sm text-darkBrown placeholder-darkBrown/50"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/70 peer-focus:text-darkBrown" />
            </div>
            {state.errors?.name && <p className="mt-2 text-sm text-red-400">{state.errors.name[0]}</p>}
          </div>

          {/* Nomor Telepon */}
          <div className="col-span-3">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-beige">
              Nomor Telepon
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="off"
                placeholder="Masukkan nomor telepon"
                className="peer block w-full rounded-md bg-beige border border-darkBrown py-2 pl-10 text-sm text-darkBrown placeholder-darkBrown/50"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/70 peer-focus:text-darkBrown" />
            </div>
          </div>

          {/* Email */}
          <div className="col-span-full">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-beige">
              Email
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Masukkan email"
                className="peer block w-full rounded-md bg-beige border border-darkBrown py-2 pl-10 text-sm text-darkBrown placeholder-darkBrown/50"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/70 peer-focus:text-darkBrown" />
            </div>
            {state.errors?.email && <p className="mt-2 text-sm text-red-400">{state.errors.email[0]}</p>}
          </div>

          {/* Pesan */}
          <div className="col-span-full">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-beige">
              Pesan
            </label>
            <div className="relative mt-2 rounded-md">
              <textarea
                id="message"
                name="message"
                rows={3}
                autoComplete="off"
                placeholder="Masukkan pesan"
                className="peer block w-full rounded-md bg-beige border border-darkBrown py-2 pl-10 text-sm text-darkBrown placeholder-darkBrown/50"
              />
              <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/70 peer-focus:text-darkBrown" />
            </div>
            {state.errors?.message && <p className="mt-2 text-sm text-red-400">{state.errors.message[0]}</p>}
          </div>

          {/* Tombol Submit */}
          <div className="col-start-1">
            <button
              type="submit"
              className="bg-beige text-darkBrown font-serif hover:opacity-90 text-sm py-2 w-full rounded-md"
            >
              Kirim
            </button>
          </div>
          
          {/* Tampilkan pesan sukses atau error */}
          {state.message && <p className="mt-4 col-span-full text-sm text-green-400">{state.message}</p>}
        </form>
      </div>
    </div>
  );
}