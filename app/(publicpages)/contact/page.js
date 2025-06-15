// app/ui/publicpages/contact-form.js
"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { createContactMessage } from "@/app/lib/actions/contact";
import { Button } from "@/app/ui/button";
import { toast } from "sonner";
import clsx from "clsx"; // clsx diaktifkan kembali

export default function ContactForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createContactMessage, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.message?.includes("successfully")) {
      toast.success("✅ Pesan terkirim!", {
        description: "Kami akan segera menghubungi Anda kembali.",
        duration: 5000,
      });
      formRef.current?.reset();
    } else if (state.message) {
      toast.error("❌ Gagal mengirim pesan!", {
        description: state.message,
        duration: 6000,
      });
    }
  }, [state]);

  const inputClasses = (hasError) => clsx(
    "block w-full rounded-md border-0 px-4 py-2.5 text-darkBrown shadow-sm ring-1 ring-inset",
    "placeholder:text-lightBrown focus:ring-2 focus:ring-inset focus:ring-darkBrown text-base",
    "transition-all duration-200 ease-in-out",
    {
      "ring-red-500 focus:ring-red-500": hasError, // Border merah jika ada error
      "ring-warmPeach hover:ring-darkBrown": !hasError, // Normal state with hover
    }
  );

  return (
    <div className="rounded-xl bg-creamLight px-8 py-12 md:px-12 shadow-xl border border-darkBrown/20">
      <form action={dispatch} ref={formRef}>
        <div className="grid grid-cols-1 gap-y-7">
          {/* Input Nama */}
          <div>
            <label htmlFor="name" className="sr-only">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama Lengkap Anda"
              className={inputClasses(state.errors?.name)}
              required
              aria-invalid={state.errors?.name ? "true" : "false"}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="mt-2 text-sm text-red-600 font-medium" aria-live="polite">
                {state.errors.name.join(', ')}
              </p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Aktif Anda"
              className={inputClasses(state.errors?.email)}
              required
              aria-invalid={state.errors?.email ? "true" : "false"}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600 font-medium" aria-live="polite">
                {state.errors.email.join(', ')}
              </p>
            )}
          </div>

          {/* Input Nomor Telepon */}
          <div>
            <label htmlFor="phone" className="sr-only">No. Telepon</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Nomor Telepon (Opsional, cth: 08123...)"
              className={inputClasses(state.errors?.phone)}
              aria-invalid={state.errors?.phone ? "true" : "false"}
              aria-describedby={state.errors?.phone ? "phone-error" : undefined}
            />
            {state.errors?.phone && (
              <p id="phone-error" className="mt-2 text-sm text-red-600 font-medium" aria-live="polite">
                {state.errors.phone.join(', ')}
              </p>
            )}
          </div>

          {/* Textarea Pesan */}
          <div>
            <label htmlFor="message" className="sr-only">Pesan</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              placeholder="Tulis pesan Anda di sini. Kami akan menghubungi Anda kembali secepatnya!"
              className={inputClasses(state.errors?.message)}
              required
              aria-invalid={state.errors?.message ? "true" : "false"}
              aria-describedby={state.errors?.message ? "message-error" : undefined}
            ></textarea>
            {state.errors?.message && (
              <p id="message-error" className="mt-2 text-sm text-red-600 font-medium" aria-live="polite">
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
  );
}