// Lokasi: app/login/page.js

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { inter, lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { authenticate } from "@/app/lib/actions/auth-actions";

export default function LoginPage() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <main className="flex items-center justify-center md:h-screen bg-beige">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-darkBrown p-3 md:h-36 shadow-md">
          <div className="w-full text-beige">
            <h1 className="font-serif text-3xl">PetAdopt Login</h1>
          </div>
        </div>

        <form action={formAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-beige/80 px-6 pb-4 pt-8 shadow border border-darkBrown/20 backdrop-blur-sm">
            <h2 className={`${inter.className} mb-3 text-xl text-darkBrown`}>
              Silakan login untuk melanjutkan.
            </h2>

            <div className="w-full">
              {/* Email Input */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-darkBrown"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-darkBrown/30 bg-white/80 py-[9px] pl-10 text-sm placeholder:text-darkBrown/60 text-darkBrown focus:border-warmPeach focus:ring-warmPeach"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Masukkan alamat email Anda"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/60 peer-focus:text-darkBrown" />
                </div>
              </div>

              {/* Password Input */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-darkBrown"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-darkBrown/30 bg-white/80 py-[9px] pl-10 text-sm placeholder:text-darkBrown/60 text-darkBrown focus:border-warmPeach focus:ring-warmPeach"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Masukkan password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBrown/60 peer-focus:text-darkBrown" />
                </div>
              </div>
            </div>

            <LoginButton />

            {errorMessage && (
              <div
                className="flex h-8 items-end space-x-1 mt-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      // --- PERUBAHAN DI SINI ---
      // Tombol diubah menjadi bg-darkBrown dengan teks beige
      className="mt-4 w-full bg-darkBrown text-beige hover:bg-darkBrown/90"
      aria-disabled={pending}
    >
      Login <ArrowRightIcon className="ml-auto h-5 w-5 text-beige" />
    </Button>
  );
}