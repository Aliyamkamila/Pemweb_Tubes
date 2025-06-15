// Lokasi: app/ui/dashboard/pets/create-form.js
"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { createPet } from "@/app/lib/actions/pet";
import { Button } from "@/app/ui/button";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import Image from "next/image";

// Komponen kecil untuk setiap field input agar lebih rapi
function FormField({ label, id, children, error }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-darkBrown"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-sm text-red-500">{error[0]}</p>}
    </div>
  );
}

// Komponen utama untuk formulir
export default function CreatePetForm({ speciesList, adoptionStatusList }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPet, initialState);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null); // Ref untuk input file

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const newFiles = chosenFiles.filter(
      (file) =>
        ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE &&
        !files.some(f => f.name === file.name && f.size === file.size) // Hindari duplikat
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    // Buat salinan baru dari file input dan hapus file yang dipilih
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    // Update file di DataTransfer object agar konsisten dengan state
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    // Panggil 'dispatch' langsung di 'action'
    <form action={dispatch} className="space-y-10 divide-y divide-darkBrown/10">
      
      {/* --- Bagian Informasi Dasar --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Informasi Dasar</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Detail utama mengenai hewan peliharaan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <FormField label="Nama" id="name" error={state.errors?.name}>
                  <input type="text" name="name" id="name" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </FormField>
              </div>
              <div className="sm:col-span-2">
                <FormField label="Jenis Kelamin" id="gender" error={state.errors?.gender}>
                  <select id="gender" name="gender" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">
                    <option value="Male">Jantan</option>
                    <option value="Female">Betina</option>
                  </select>
                </FormField>
              </div>
              <div className="sm:col-span-full">
                <FormField label="Deskripsi" id="description" error={state.errors?.description}>
                  <textarea id="description" name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </FormField>
                <p className="mt-2 text-xs leading-5 text-gray-500">Tulis beberapa kalimat tentang hewan ini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bagian Detail Fisik & Jenis --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
         <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Detail Fisik & Jenis</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Informasi spesifik mengenai ukuran dan jenis hewan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2"><FormField label="Umur (Tahun)" id="age" error={state.errors?.age}><input type="number" name="age" id="age" step="0.1" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
              <div className="sm:col-span-2"><FormField label="Berat (kg)" id="weight" error={state.errors?.weight}><input type="number" name="weight" id="weight" step="0.1" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
              <div className="sm:col-span-2"><FormField label="Tinggi (cm)" id="height" error={state.errors?.height}><input type="number" name="height" id="height" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
              <div className="sm:col-span-3"><FormField label="Spesies" id="species_id" error={state.errors?.species_id}><select id="species_id" name="species_id" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">{speciesList.map((s) => ( <option key={s.id} value={s.id}>{s.name}</option>))}</select></FormField></div>
              <div className="sm:col-span-3"><FormField label="Ras" id="breed" error={state.errors?.breed}><input type="text" name="breed" id="breed" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Bagian Lokasi & Status --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Lokasi & Status</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Informasi lokasi terkini dan status adopsi hewan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3"><FormField label="Kota" id="city" error={state.errors?.city}><input type="text" name="city" id="city" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
              <div className="sm:col-span-3"><FormField label="Provinsi" id="state" error={state.errors?.state}><input type="text" name="state" id="state" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" /></FormField></div>
              <div className="sm:col-span-3"><FormField label="Publikasi" id="published" error={state.errors?.published}><select id="published" name="published" defaultValue="true" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"><option value="true">Ya, Publikasikan</option><option value="false">Tidak, Simpan sebagai Draf</option></select></FormField></div>
              <div className="sm:col-span-3"><FormField label="Status Adopsi" id="adoption_status_id" error={state.errors?.adoption_status_id}><select id="adoption_status_id" name="adoption_status_id" className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">{adoptionStatusList.map((status) => ( <option key={status.id} value={status.id}>{status.name}</option>))}</select></FormField></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Bagian Unggah Foto --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Foto Hewan</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Unggah satu atau lebih foto dari hewan peliharaan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="col-span-full">
              <label htmlFor="images" className="block text-sm font-medium leading-6 text-darkBrown">Unggah Foto</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-darkBrown/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>Pilih foto</span>
                      {/* Pastikan nama input adalah 'images' */}
                      <input id="images" name="images" type="file" multiple className="sr-only" onChange={handleFileChange} accept="image/*" ref={fileInputRef} />
                    </label>
                    <p className="pl-1">atau seret dan lepas</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP hingga 5MB</p>
                </div>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-darkBrown">Foto yang akan diunggah:</h3>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image src={URL.createObjectURL(file)} alt={file.name} width={150} height={150} className="rounded-md object-cover aspect-square" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button type="button" onClick={() => handleRemoveFile(index)} className="p-1 bg-white rounded-full">
                            <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                       <p className="text-xs text-center truncate mt-1">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Tombol Aksi --- */}
      <div className="flex items-center justify-end gap-x-6 pt-6">
        <Link href="/dashboard/pets" className="text-sm font-semibold leading-6 text-darkBrown">Batal</Link>
        <Button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Simpan Data Hewan</Button>
      </div>

      {/* --- Area Notifikasi Error --- */}
      {state?.message && (
        <div className="mt-4 text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
}