// app/ui/dashboard/adoptions/edit-form.js
"use client";

import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { updateContactMessageStatus } from "@/app/lib/actions/contact"; // PERBAIKAN: Mengganti import
import { useState } from "react";
import Link from "next/link";

// Komponen utama formulir
export default function EditAdoptionForm({ message }) { // PERBAIKAN: Mengganti 'adoption' menjadi 'message'
  const [errors, setErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(''); // PERBAIKAN: Mengganti nama 'message' menjadi 'feedbackMessage'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});
    setFeedbackMessage(''); // Bersihkan pesan sebelumnya
    
    const formData = new FormData(event.currentTarget);
    
    // PERBAIKAN: Panggil server action yang benar dan gunakan message.id
    const result = await updateContactMessageStatus(message.id, formData); 

    setIsSubmitting(false);

    if (result && result.errors) {
        setErrors(result.errors);
        setFeedbackMessage(result.message || 'Gagal memperbarui status.');
    } else if (result && result.message) {
        setFeedbackMessage(result.message);
    }
    // Redirect akan ditangani oleh server action jika berhasil
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-darkBrown">Nama Pengirim</label>
                        <p className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 bg-gray-100">{message.name}</p> {/* PERBAIKAN: Menggunakan message.name */}
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-darkBrown">Email Pengirim</label>
                        <p className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 bg-gray-100">{message.email}</p> {/* PERBAIKAN: Menggunakan message.email */}
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-darkBrown">
                            Ubah Status Pesan
                        </label>
                        <div className="mt-2">
                            <select
                                id="status"
                                name="status"
                                className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                defaultValue={message.status} // PERBAIKAN: Menggunakan message.status
                            >
                                <option value="Belum dihubungi">Belum dihubungi</option>
                                <option value="Sudah dihubungi">Sudah dihubungi</option>
                            </select>
                        </div>
                        {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status[0]}</p>}
                    </div>
                </div>
                {feedbackMessage && Object.keys(errors).length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-red-600 mt-4">
                        <ExclamationCircleIcon className="h-5 w-5" /> {feedbackMessage}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <Link href="/dashboard/adoptions" className="text-sm font-semibold leading-6 text-gray-900">
                    Batal
                </Link>
                <button type="submit" disabled={isSubmitting} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400">
                    {isSubmitting ? 'Menyimpan...' : 'Update Status'}
                </button>
            </div>
        </div>
    </form>
  );
}