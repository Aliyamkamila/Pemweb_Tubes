// Lokasi: app/(publicpages)/contact/page.js
"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { createContactMessage } from "@/app/lib/actions/contact";
import { Button } from "@/app/ui/button";
import { toast } from "sonner";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

// Komponen untuk setiap item kontak
function ContactInfoItem({ icon, title, children }) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-warmPeach" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-beige/90">{title}</h3>
        <div className="text-beige/80">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, formAction] = useFormState(createContactMessage, initialState);

  // useEffect untuk memantau perubahan state dan menampilkan notifikasi
  useEffect(() => {
    if (state.success) {
      // Menggunakan pesan dari server action yang sudah diperbarui
      toast.success(state.message);
      document.querySelector("form")?.reset();
    } else if (state.message && Object.keys(state.errors).length > 0) {
      toast.error("Gagal mengirim pesan. Silakan periksa kembali isian Anda.");
    }
  }, [state]);

  const inputClasses = (hasError) =>
    `block w-full rounded-md border py-2 px-3 text-sm text-darkBrown placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-darkBrown ${
      hasError ? "border-red-500 ring-red-500" : "border-gray-300 bg-white/80"
    }`;

  return (
    <div className="bg-darkBrown/90 text-beige rounded-2xl shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Kolom Informasi Kontak */}
        <div className="p-8 sm:p-12 bg-darkBrown">
          <h2 className="text-3xl font-bold text-warmPeach mb-4">Informasi Kontak</h2>
          <p className="text-beige/80 mb-8">
            Jangan ragu untuk menghubungi kami melalui detail di bawah ini atau kirimkan pesan langsung melalui formulir di samping.
          </p>
          <div className="space-y-6">
            <ContactInfoItem icon={MapPinIcon} title="Alamat Kami">
              <p>Jl. Sayang Binatang No. 123</p>
              <p>Bandung, Jawa Barat, 40123</p>
            </ContactInfoItem>
            <ContactInfoItem icon={PhoneIcon} title="Telepon">
              <p>(022) 123-4567</p>
            </ContactInfoItem>
            <ContactInfoItem icon={EnvelopeIcon} title="Email">
              <p>info@cozyhouse.com</p>
            </ContactInfoItem>
          </div>
        </div>

        {/* Kolom Formulir Kontak */}
        <div className="p-8 sm:p-12 bg-beige/90 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center text-darkBrown mb-6">
            Hubungi Kami
          </h2>
          <form action={formAction} className="space-y-5">
            {/* Input Nama */}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-darkBrown">Nama Lengkap</label>
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
                  {state.errors.name.join(', ')}
                </p>
              )}
            </div>

            {/* Input Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-darkBrown">Email</label>
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
                  {state.errors.email.join(', ')}
                </p>
              )}
            </div>

            {/* Input Nomor Telepon */}
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-darkBrown">No. Telepon (Opsional)</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="cth: 08123..."
                className={inputClasses(state.errors?.phone)}
              />
              {state.errors?.phone && (
                <p className="mt-2 text-sm text-red-600">
                  {state.errors.phone.join(', ')}
                </p>
              )}
            </div>

            {/* Textarea Pesan */}
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-darkBrown">Pesan</label>
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
                  {state.errors.message.join(', ')}
                </p>
              )}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-warmPeach text-darkBrown hover:bg-opacity-90">
                Kirim Pesan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}