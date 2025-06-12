"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  IdentificationIcon,
  AtSymbolIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { createContactMessage } from "@/app/lib/actions/contact";

// Komponen untuk menampilkan informasi kontak
function ContactInfo() {
  return (
    <div className="flex flex-col justify-center text-beige">
      <h2 className="text-3xl font-bold font-serif text-beige">
        Informasi Kontak
      </h2>
      <p className="mt-2 text-beige/80">
        Anda juga dapat menghubungi kami melalui detail di bawah ini.
      </p>
      <div className="mt-8 space-y-6 text-lg">
        <div className="flex items-center gap-4">
          <MapPinIcon className="w-6 h-6 text-beige flex-shrink-0" />
          <span>Bandung, Jawa Barat, Indonesia</span>
        </div>
        <div className="flex items-center gap-4">
          <AtSymbolIcon className="w-6 h-6 text-beige flex-shrink-0" />
          <span>contact@petadopt.com</span>
        </div>
        <div className="flex items-center gap-4">
          <PhoneIcon className="w-6 h-6 text-beige flex-shrink-0" />
          <span>(022) 123-4567</span>
        </div>
      </div>
    </div>
  );
}

// Komponen utama halaman
export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createContactMessage, initialState);
  const formRef = useRef(null);

  // Mereset form jika pengiriman berhasil
  useEffect(() => {
    if (state.message && !state.errors) {
      formRef.current?.reset();
    }
  }, [state]);

  const isSuccess = state.message && !state.errors;
  const isError = state.message && state.errors;

  return (
    <div className="bg-darkBrown rounded-xl shadow-lg p-8 sm:p-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Kolom Informasi Kontak */}
        <ContactInfo />

        {/* Kolom Formulir */}
        <div className="p-8 rounded-lg bg-black/20">
          {isSuccess ? (
            // Tampilan setelah berhasil mengirim
            <div className="flex flex-col items-center justify-center h-full text-center text-beige">
              <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold font-serif text-beige">
                Pesan Terkirim!
              </h2>
              <p className="mt-2 text-lg">{state.message}</p>
            </div>
          ) : (
            // Tampilan Formulir
            <form ref={formRef} action={formAction} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold font-serif text-beige">
                  Hubungi Kami
                </h2>
                <p className="mt-2 text-sm text-beige/80">
                  Kami akan menghubungi Anda secepat mungkin.
                </p>
              </div>

              {/* Nama & Nomor Telepon */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-beige">Nama</label>
                  <div className="relative">
                    <input id="name" name="name" type="text" placeholder="Masukkan nama" className="peer block w-full rounded-md border-0 bg-white/5 py-2 pl-10 text-beige ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-beige placeholder:text-beige/50" />
                    <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-beige/60" />
                  </div>
                  {state.errors?.name && <p className="mt-2 text-sm text-red-400">{state.errors.name[0]}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-beige">Nomor Telepon</label>
                  <div className="relative">
                    <input id="phone" name="phone" type="tel" placeholder="Masukkan nomor telepon" className="peer block w-full rounded-md border-0 bg-white/5 py-2 pl-10 text-beige ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-beige placeholder:text-beige/50" />
                    <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-beige/60" />
                  </div>
                   {state.errors?.phone && <p className="mt-2 text-sm text-red-400">{state.errors.phone[0]}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-beige">Email</label>
                <div className="relative">
                  <input id="email" name="email" type="email" placeholder="Masukkan email" className="peer block w-full rounded-md border-0 bg-white/5 py-2 pl-10 text-beige ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-beige placeholder:text-beige/50" />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-beige/60" />
                </div>
                {state.errors?.email && <p className="mt-2 text-sm text-red-400">{state.errors.email[0]}</p>}
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-beige">Pesan</label>
                <div className="relative">
                  <textarea id="message" name="message" rows={4} placeholder="Masukkan pesan" className="peer block w-full rounded-md border-0 bg-white/5 py-2 pl-10 text-beige ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-beige placeholder:text-beige/50" />
                  <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-5 h-5 w-5 -translate-y-1/2 text-beige/60" />
                </div>
                {state.errors?.message && <p className="mt-2 text-sm text-red-400">{state.errors.message[0]}</p>}
              </div>

              {/* Tombol Submit */}
              <div className="pt-2">
                <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-md bg-beige px-3 py-2.5 text-center text-sm font-semibold text-darkBrown shadow-sm hover:bg-beige/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige">
                  Kirim Pesan
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Menampilkan pesan error utama */}
              {isError && (
                <div className="flex items-center gap-2 mt-4 text-sm text-red-400">
                  <ExclamationCircleIcon className="w-5 h-5" />
                  <p>{state.message}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}