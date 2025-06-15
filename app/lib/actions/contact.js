// Lokasi: app/(publicpages)/contact/page.js
"use client";

import { useFormState } from "react-dom";
import { createContactMessage } from "@/app/lib/actions/contact";
import { Button } from "@/app/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  // Pastikan bagian ini ada:
  const initialState = {
    errors: {},
    message: null,
  };

  // Pastikan initialState digunakan di sini:
  const [state, formAction] = useFormState(createContactMessage, initialState);

  const inputClasses = (hasError) =>
    `block w-full rounded-md border py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown ${
      hasError ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-center text-brown-800 mb-2">
          Hubungi Kami
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Punya pertanyaan atau ingin memulai proses adopsi? Kirimkan pesan kepada kami!
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama Lengkap Anda"
              className={inputClasses(state.errors?.name)}
              required
              aria-describedby="name-error"
            />
            {state.errors?.name && (
              <div id="name-error" className="flex items-center mt-2 text-sm text-red-500">
                <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                {state.errors.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@anda.com"
              className={inputClasses(state.errors?.email)}
              required
              aria-describedby="email-error"
            />
             {state.errors?.email && (
              <div id="email-error" className="flex items-center mt-2 text-sm text-red-500">
                <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                {state.errors.email}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Pesan
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Tuliskan pesan Anda di sini..."
              className={inputClasses(state.errors?.message)}
              required
              aria-describedby="message-error"
            ></textarea>
             {state.errors?.message && (
              <div id="message-error" className="flex items-center mt-2 text-sm text-red-500">
                <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                {state.errors.message}
              </div>
            )}
          </div>
          
          <div>
            <Button type="submit" className="w-full">Kirim Pesan</Button>
          </div>
          
          <div aria-live="polite" aria-atomic="true">
            {state.message && (
                <p className={`mt-2 text-sm ${state.errors ? 'text-red-500' : 'text-green-500'}`}>
                    {state.message}
                </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}