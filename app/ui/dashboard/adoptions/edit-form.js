"use client";

import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { updateAdoption } from "@/app/lib/actions/adoption";
import { useState } from "react";
import Link from "next/link";

// Komponen utama formulir
export default function EditAdoptionForm({ adoption, adoptionStatusList }) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});
    setMessage('');
    
    const formData = new FormData(event.currentTarget);
    
    // Panggil server action yang baru kita buat
    const result = await updateAdoption(adoption.id, null, formData);

    setIsSubmitting(false);

    if (result && result.errors) {
        setErrors(result.errors);
        setMessage(result.message || 'Gagal memperbarui status.');
    } else if (result && result.message) {
        setMessage(result.message);
    }
    // Redirect akan ditangani oleh server action jika berhasil
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-darkBrown">Nama Hewan</label>
                        <p className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 bg-gray-100">{adoption.pet.name}</p>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-darkBrown">Nama Pengaju</label>
                        <p className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 bg-gray-100">{adoption.user.name}</p>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-darkBrown">
                            Ubah Status Adopsi
                        </label>
                        <div className="mt-2">
                            <select
                                id="status"
                                name="status"
                                className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                defaultValue={adoption.status}
                            >
                                {adoptionStatusList.map((status) => (
                                <option key={status.id} value={status.name}>
                                    {status.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status[0]}</p>}
                    </div>
                </div>
                {message && Object.keys(errors).length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-red-600 mt-4">
                        <ExclamationCircleIcon className="h-5 w-5" /> {message}
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