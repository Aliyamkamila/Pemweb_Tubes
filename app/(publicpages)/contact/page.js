"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { createContactMessage } from "@/app/lib/actions/contact";
import SocialMediaIcons from "@/app/ui/social-media-icons";
// TAMBAHKAN IMPOR FONT DI SINI
import { opensans } from "@/app/ui/fonts";
import { Button } from "@/app/ui/button";
import { toast } from "sonner";
import clsx from "clsx";

export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createContactMessage, initialState);
  const formRef = useRef(null);

  // Mereset form jika pengiriman berhasil
  useEffect(() => {
    if (state.message?.includes("successfully")) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    // Menggunakan font yang sudah diimpor
    <div className={`py-12 md:py-24 ${opensans.className}`}>
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-darkBrown md:text-4xl">
            Hubungi Kami
          </h2>
          <p className="mt-6 text-lg leading-8 text-darkBrown/80">
            Punya pertanyaan atau ingin tahu lebih lanjut? Jangan ragu untuk
            menghubungi kami.
          </p>
          <div className="mt-10">
            <SocialMediaIcons />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-xl md:mt-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-start text-center">
              <span className="mb-4 rounded-lg bg-warmPeach p-3 text-darkBrown">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
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
              <h3 className="mb-2 text-lg font-semibold text-darkBrown">
                Alamat
              </h3>
              <p className="text-darkBrown/80">
                Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 px-6 py-12 md:px-12">
              <form action={dispatch} ref={formRef}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nama Anda"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-darkBrown md:text-sm md:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Anda"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-darkBrown md:text-sm md:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="No. Telepon (Opsional)"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-darkBrown md:text-sm md:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Pesan
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      placeholder="Pesan Anda"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-darkBrown md:text-sm md:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button type="submit">Kirim Pesan</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}