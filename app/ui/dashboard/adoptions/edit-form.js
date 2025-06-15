// Lokasi: app/ui/dashboard/pets/edit-form.js
"use client";

import { useFormState } from "react-dom"; // <--- PERUBAHAN DI SINI
import Link from "next/link";
import { updatePet } from "@/app/lib/actions/pet";
import { Button } from "@/app/ui/button";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Image from "next/image";

// Komponen kecil untuk setiap field input
function FormField({ label, id, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-darkBrown"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Komponen utama untuk formulir edit
export default function EditPetForm({ pet, speciesList, adoptionStatusList }) {
  const updatePetWithId = updatePet.bind(null, pet.id);
  const initialState = { message: null, errors: {} };
  
  // Ganti useActionState menjadi useFormState
  const [state, dispatch] = useFormState(updatePetWithId, initialState); // <--- PERUBAHAN DI SINI

  // State untuk file tidak perlu diubah
  const [files, setFiles] = useState(pet.images || []);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const validFiles = chosenFiles.filter(
      (file) =>
        ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    );
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  
  // Fungsi handleFormSubmit tidak diperlukan jika menggunakan action
  // const handleFormSubmit = (event) => { ... };

  return (
    // Gunakan 'dispatch' langsung di 'action'
    <form action={dispatch} className="space-y-10 divide-y divide-darkBrown/10">
      
      {/* Bagian Informasi Dasar */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Informasi Dasar</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Perbarui detail utama mengenai hewan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <FormField label="Nama" id="name">
                  <input type="text" name="name" id="name" defaultValue={pet.name} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </FormField>
                {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}
              </div>
              <div className="sm:col-span-2">
                <FormField label="Jenis Kelamin" id="gender">
                  <select id="gender" name="gender" defaultValue={pet.gender} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">
                    <option value="Jantan">Jantan</option>
                    <option value="Betina">Betina</option>
                  </select>
                </FormField>
              </div>
              <div className="sm:col-span-full">
                <FormField label="Deskripsi" id="description">
                  <textarea id="description" name="description" rows={3} defaultValue={pet.description} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </FormField>
                {state.errors?.description && <p className="mt-2 text-sm text-red-500">{state.errors.description[0]}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Detail Fisik & Jenis */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-darkBrown">Detail Fisik & Jenis</h2>
            <p className="mt-1 text-sm leading-6 text-darkBrown/80">Perbarui ukuran dan jenis hewan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2"><FormField label="Umur (Tahun)" id="age"><input type="number" name="age" id="age" defaultValue={pet.age} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                    <div className="sm:col-span-2"><FormField label="Berat (kg)" id="weight"><input type="number" name="weight" id="weight" step="0.1" defaultValue={pet.weight} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                    <div className="sm:col-span-2"><FormField label="Tinggi (cm)" id="height"><input type="number" name="height" id="height" defaultValue={pet.height} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                    <div className="sm:col-span-3"><FormField label="Spesies" id="species_id"><select id="species_id" name="species_id" defaultValue={pet.species_id} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300">{speciesList.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}</select></FormField></div>
                    <div className="sm:col-span-3"><FormField label="Ras" id="breed"><input type="text" name="breed" id="breed" defaultValue={pet.breed} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                </div>
            </div>
        </div>
      </div>

      {/* Bagian Lokasi & Status */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-darkBrown">Lokasi & Status</h2>
            <p className="mt-1 text-sm leading-6 text-darkBrown/80">Perbarui lokasi dan status adopsi.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3"><FormField label="Kota" id="city"><input type="text" name="city" id="city" defaultValue={pet.city} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                    <div className="sm:col-span-3"><FormField label="Provinsi" id="state"><input type="text" name="state" id="state" defaultValue={pet.state} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"/></FormField></div>
                    <div className="sm:col-span-3"><FormField label="Publikasi" id="published"><select id="published" name="published" defaultValue={pet.published.toString()} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300"><option value="true">Ya, Publikasikan</option><option value="false">Tidak, Simpan sebagai Draf</option></select></FormField></div>
                    <div className="sm:col-span-3"><FormField label="Status Adopsi" id="adoption_status_id"><select id="adoption_status_id" name="adoption_status_id" defaultValue={pet.adoption_status_id} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300">{adoptionStatusList.map((status) => (<option key={status.id} value={status.id}>{status.name}</option>))}</select></FormField></div>
                </div>
            </div>
        </div>
      </div>

      {/* Bagian Foto (Tidak perlu diubah) */}
      {/* ... kode untuk foto tetap sama ... */}

      {/* Tombol Aksi */}
      <div className="flex items-center justify-end gap-x-6 pt-6">
        <Link href="/dashboard/pets" className="text-sm font-semibold leading-6 text-darkBrown">
          Batal
        </Link>
        <Button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Perbarui Data
        </Button>
      </div>

      {/* Area Notifikasi Error */}
      {state?.message && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}
    </form>
  );
}