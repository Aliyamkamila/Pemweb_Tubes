// Lokasi: app/ui/dashboard/pets/edit-form.js
"use client";

import { updatePet } from "@/app/lib/actions/pet";
import { useFormState } from "react-dom"; // PERUBAHAN KRITIS 1: Impor dari 'react-dom'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";

export default function EditPetForm({ pet, speciesList, adoptionStatusList }) {
  const updatePetWithId = updatePet.bind(null, pet.id);
  const initialState = { message: "", errors: {} };

  // PERUBAHAN KRITIS 2: Menggunakan useFormState
  const [state, dispatch] = useFormState(updatePetWithId, initialState);

  // State untuk preview gambar, diisi dengan gambar yang sudah ada
  const [previews, setPreviews] = useState(pet.images.map(img => img.url));

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews); // Ganti preview dengan gambar baru
    }
  };

  return (
    // PERUBAHAN KRITIS 3: Hapus onSubmit dan gunakan 'action'
    <form action={dispatch} className="space-y-10">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Nama Hewan */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Nama Hewan</label>
          <input id="name" name="name" type="text" defaultValue={pet.name} className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" required/>
          {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}
        </div>

        {/* Spesies */}
        <div className="mb-4">
          <label htmlFor="species" className="mb-2 block text-sm font-medium">Spesies</label>
          <select id="species" name="species_id" defaultValue={pet.species_id} className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm" required>
            <option value="" disabled>Pilih Spesies</option>
            {speciesList?.map((species) => (<option key={species.id} value={species.id}>{species.name}</option>))}
          </select>
          {state.errors?.species_id && <p className="mt-2 text-sm text-red-500">{state.errors.species_id[0]}</p>}
        </div>

        {/* ... sisa field lainnya ... (disalin dari jawaban sebelumnya, sudah benar) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mb-4">
                <label htmlFor="age" className="mb-2 block text-sm font-medium">Umur (tahun)</label>
                <input id="age" name="age" type="number" step="0.1" defaultValue={pet.age} required className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"/>
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Jenis Kelamin</label>
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input id="Male" name="gender" type="radio" value="Male" defaultChecked={pet.gender === 'Male'} className="h-4 w-4"/>
                        <label htmlFor="Male" className="ml-2">Laki-laki</label>
                    </div>
                    <div className="flex items-center">
                        <input id="Female" name="gender" type="radio" value="Female" defaultChecked={pet.gender === 'Female'} className="h-4 w-4"/>
                        <label htmlFor="Female" className="ml-2">Perempuan</label>
                    </div>
                </div>
            </div>
        </div>

        {/* Unggah Foto */}
        <div className="col-span-full">
            <label className="mb-2 block text-sm font-medium">Foto Hewan</label>
            <p className="text-xs text-gray-500 mb-2">Gambar lama akan diganti jika Anda mengunggah yang baru.</p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                            <span>Unggah file</span>
                            <input id="file-upload" name="petImages" type="file" multiple className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" />
                        </label>
                        <p className="pl-1">atau tarik dan lepas</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP hingga 5MB</p>
                </div>
            </div>
            {/* Preview Gambar */}
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative w-full h-32">
                            <Image src={src} alt={`Preview ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/pets" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">
          Batal
        </Link>
        <Button type="submit">Perbarui Hewan</Button>
      </div>

      {/* Notifikasi Error Global */}
      {state.message && <p className="mt-4 text-sm text-red-500 text-center">{state.message}</p>}
    </form>
  );
}