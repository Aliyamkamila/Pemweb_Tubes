// Lokasi: app/(publicpages)/contact/page.js
"use client";

import { useFormState } from "react-dom";
import { createContactMessage } from "@/app/lib/actions/contact";
import { Button } from "@/app/ui/button";

// Mengganti nama komponen agar lebih sesuai dengan nama file (praktik yang baik)
export default function ContactPage() {
  const initialState = { message: null, errors: {} };
  
  // 'formAction' adalah fungsi yang seharusnya dieksekusi oleh form
  const [state, formAction] = useFormState(createContactMessage, initialState);

  // Fungsi sederhana untuk styling, menggantikan clsx sementara
  const inputClasses = (hasError) =>
    `block w-full rounded-md border py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-darkBrown ${
      hasError ? "border-red-500 ring-red-500" : "border-gray-300"
    }`;

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto rounded-xl bg-gray-50 p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hubungi Kami
        </h2>

        {/* Pastikan 'action' di sini menggunakan 'formAction' dari useFormState */}
        <form action={formAction} className="space-y-5">
          {/* Input Nama */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama Anda"
              className={inputClasses(state.errors?.name)}
              required
            />
            {state.errors?.name && (
              <p className="mt-2 text-sm text-red-600">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email aktif Anda"
              className={inputClasses(state.errors?.email)}
              required
            />
            {state.errors?.email && (
              <p className="mt-2 text-sm text-red-600">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Input Nomor Telepon */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">No. Telepon (Opsional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="cth: 08123..."
              className={inputClasses(state.errors?.phone)}
            />
            {state.errors?.phone && (
              <p className="mt-2 text-sm text-red-600">
                {state.errors.phone}
              </p>
            )}
          </div>

          {/* Textarea Pesan */}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Pesan</label>
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Tulis pesan Anda di sini..."
              className={inputClasses(state.errors?.message)}
              required
            ></textarea>
            {state.errors?.message && (
              <p className="mt-2 text-sm text-red-600">
                {state.errors.message}
              </p>
            )}
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button type="submit">
              Kirim Pesan
            </Button>
          </div>

           {/* Menampilkan pesan sukses atau gagal dari server */}
           {state.message && (
            <div className="mt-4 text-center">
              <p className={`text-sm ${state.errors ? 'text-red-600' : 'text-green-600'}`}>
                {state.message}
              </p>
            </div>
           )}
        </form>
      </div>
    </div>
  );
}