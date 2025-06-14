// app/(publicpages)/contact/page.js
"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { createContactMessage } from "@/app/lib/actions/contact";
import { opensans } from "@/app/ui/fonts";
import { Button } from "@/app/ui/button";
import { toast } from "sonner"; // Pastikan Sonner terinstal dan dikonfigurasi di layout root Anda
import clsx from "clsx";

export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createContactMessage, initialState);
  const formRef = useRef(null);

  // Mereset form dan menampilkan notifikasi jika pengiriman berhasil/gagal
  useEffect(() => {
    if (state.message?.includes("successfully")) { // Menangkap pesan sukses dari server action
      toast.success("Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.");
      formRef.current?.reset(); // Mereset semua input form
    } else if (state.message) {
      // Menampilkan pesan error dari server action
      toast.error(state.message);
    }
  }, [state]);

  return (
    // Menggunakan font yang sudah diimpor dan warna latar belakang yang lebih menarik
    <div className={`py-12 md:py-24 bg-beige ${opensans.className}`}>
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-darkBrown md:text-5xl">
            Hubungi Kami
          </h2>
          <p className="mt-4 text-lg leading-8 text-darkBrown/80">
            Punya pertanyaan, kritik, atau saran? Jangan ragu untuk menghubungi kami.
            Kami siap membantu dan akan merespons secepatnya.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl md:mt-24">
          <div className="grid grid-cols-1 gap-12"> {/* Hanya satu kolom karena sosmed dihapus */}
            {/* Bagian Informasi Kontak (Alamat, Telepon, Email) */}
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-creamLight shadow-lg border border-warmPeach/50">
              <span className="mb-6 rounded-full bg-darkBrown p-4 text-warmPeach shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              <h3 className="mb-3 text-xl font-semibold text-darkBrown">
                Kunjungi Kami
              </h3>
              <p className="text-center text-darkBrown/80">
                Jl. Telekomunikasi No. 1, Terusan Buahbatu, <br />Dayeuhkolot, Bandung, Jawa Barat 40257
              </p>
              
              <h3 className="mt-8 mb-3 text-xl font-semibold text-darkBrown">
                Hubungi Langsung
              </h3>
              <p className="text-center text-darkBrown/80">
                Telepon: <a href="tel:+62227564108" className="text-mediumBrown hover:underline">(022) 7564108</a> <br />
                Email: <a href="mailto:info@cozyhouse.com" className="text-mediumBrown hover:underline">info@cozyhouse.com</a>
              </p>
            </div>

            {/* Bagian Formulir Kontak */}
            <div className="rounded-xl bg-creamLight px-8 py-12 md:px-12 shadow-xl border border-darkBrown/20">
              <form action={dispatch} ref={formRef}>
                <div className="grid grid-cols-1 gap-y-7">
                  <div>
                    <label htmlFor="name" className="sr-only">Nama</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nama Lengkap Anda"
                      className="block w-full rounded-md border-0 px-4 py-2.5 text-darkBrown shadow-sm ring-1 ring-inset ring-warmPeach placeholder:text-lightBrown focus:ring-2 focus:ring-inset focus:ring-darkBrown text-base"
                      required
                    />
                    {/* Menampilkan error validasi dari server action */}
                    {state.errors?.name && (
                      <p className="mt-2 text-sm text-red-600">
                        {state.errors.name.join(', ')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Aktif Anda"
                      className="block w-full rounded-md border-0 px-4 py-2.5 text-darkBrown shadow-sm ring-1 ring-inset ring-warmPeach placeholder:text-lightBrown focus:ring-2 focus:ring-inset focus:ring-darkBrown text-base"
                      required
                    />
                     {state.errors?.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {state.errors.email.join(', ')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">No. Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Nomor Telepon (Opsional, cth: 08123...)"
                      className="block w-full rounded-md border-0 px-4 py-2.5 text-darkBrown shadow-sm ring-1 ring-inset ring-warmPeach placeholder:text-lightBrown focus:ring-2 focus:ring-inset focus:ring-darkBrown text-base"
                    />
                     {state.errors?.phone && (
                      <p className="mt-2 text-sm text-red-600">
                        {state.errors.phone.join(', ')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Pesan</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5} // Menambah jumlah baris default
                      placeholder="Tulis pesan Anda di sini. Kami akan menghubungi Anda kembali secepatnya!"
                      className="block w-full rounded-md border-0 px-4 py-2.5 text-darkBrown shadow-sm ring-1 ring-inset ring-warmPeach placeholder:text-lightBrown focus:ring-2 focus:ring-inset focus:ring-darkBrown text-base"
                      required
                    ></textarea>
                     {state.errors?.message && (
                      <p className="mt-2 text-sm text-red-600">
                        {state.errors.message.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-darkBrown hover:bg-lightBrown text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Kirim Pesan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}