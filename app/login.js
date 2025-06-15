"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { authenticate } from '@/app/lib/actions/auth-actions';

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <main className="flex items-center justify-center md:h-screen bg-[#F5EEE6]">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Header Coklat */}
        <div className="flex h-20 w-full items-end rounded-lg bg-[#5C3D2E] p-3 md:h-36 shadow-md">
          <div className="w-full text-[#FFF8EF]">
            <h1 className={`${lusitana.className} text-3xl`}>Cozy House Login</h1>
          </div>
        </div>

        <form action={formAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-[#FAF3E0] px-6 pb-4 pt-8 shadow border border-[#E2D8C3]">
            <h1 className={`${lusitana.className} mb-3 text-2xl text-[#5C3D2E]`}>
              Silakan login untuk melanjutkan.
            </h1>

            <div className="w-full">
              {/* Email */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-[#5C3D2E]"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-[#DECDB9] bg-[#FDF8F2] py-[9px] pl-10 text-sm placeholder:text-[#A08D76] text-[#5C3D2E]"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Masukkan alamat email Anda"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A08D76] peer-focus:text-[#5C3D2E]" />
                </div>
              </div>

              {/* Password */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-[#5C3D2E]"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-[#DECDB9] bg-[#FDF8F2] py-[9px] pl-10 text-sm placeholder:text-[#A08D76] text-[#5C3D2E]"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Masukkan password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A08D76] peer-focus:text-[#5C3D2E]" />
                </div>
              </div>
            </div>

            <LoginButton />

            {errorMessage && (
              <div className="flex h-8 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true">
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
      className="mt-4 w-full bg-[#5C3D2E] text-[#FFF8EF] hover:bg-[#4A2F23]"
      aria-disabled={pending}
    >
      Login <ArrowRightIcon className="ml-auto h-5 w-5 text-[#FFF8EF]" />
    </Button>
  );
}
