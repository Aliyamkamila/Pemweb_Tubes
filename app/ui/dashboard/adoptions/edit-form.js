// Lokasi: app/ui/dashboard/pets/edit-form.js
"use client";

import { useActionState } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { updatePet } from "@/app/lib/actions/pet";

// Komponen kecil untuk setiap field input agar lebih rapi
function FormField({ label, id, children, error }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-darkBrown">
          {label}
        </label>
        <div className="mt-2">{children}</div>
        {error && <p className="mt-2 text-sm text-red-500">{error[0]}</p>}
      </div>
    );
}
  

// Komponen utama formulir
export default function EditPetForm({ pet, speciesList, adoptionStatusList }) {
  const updatePetWithId = updatePet.bind(null, pet.id);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(updatePetWithId, initialState);
  
  // State untuk preview gambar, diisi dengan gambar yang sudah ada
  const [existingImages, setExistingImages] = useState(pet.petImages || []);
  const [newFiles, setNewFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles(selectedFiles);
    setExistingImages([]); // Kosongkan gambar lama jika ada file baru yang dipilih
  };

  const handleRemoveNewFile = (index) => {
    setNewFiles(newFiles.filter((_, i) => i !== index));
  }
  
  return (
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
                  <input type="text" name="name" id="name" defaultValue={pet.name} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>
              <div className="sm:col-span-2">
                <FormField label="Jenis Kelamin" id="gender" error={state.errors?.gender}>
                    <select id="gender" name="gender" defaultValue={pet.gender} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                        <option value="Male">Jantan</option>
                        <option value="Female">Betina</option>
                    </select>
                </FormField>
              </div>
              <div className="sm:col-span-full">
                <FormField label="Deskripsi" id="description" error={state.errors?.description}>
                    <textarea id="description" name="description" rows={3} defaultValue={pet.description} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
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
                    <div className="sm:col-span-2">
                        <FormField label="Umur (Tahun)" id="age" error={state.errors?.age}>
                            <input type="number" name="age" id="age" step="0.1" defaultValue={pet.age} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField label="Berat (kg)" id="weight" error={state.errors?.weight}>
                            <input type="number" name="weight" id="weight" step="0.1" defaultValue={pet.weight} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField label="Tinggi (cm)" id="height" error={state.errors?.height}>
                            <input type="number" name="height" id="height" defaultValue={pet.height} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Spesies" id="species_id" error={state.errors?.species_id}>
                            <select id="species_id" name="species_id" defaultValue={pet.speciesId} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                {speciesList.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Ras" id="breed" error={state.errors?.breed}>
                            <input type="text" name="breed" id="breed" defaultValue={pet.breed} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
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
                    <div className="sm:col-span-3">
                        <FormField label="Kota" id="city" error={state.errors?.city}>
                            <input type="text" name="city" id="city" defaultValue={pet.city} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Provinsi" id="state" error={state.errors?.state}>
                            <input type="text" name="state" id="state" defaultValue={pet.state} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Publikasi" id="published" error={state.errors?.published}>
                            <select id="published" name="published" defaultValue={pet.published ? "true" : "false"} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                <option value="true">Ya, Publikasikan</option>
                                <option value="false">Tidak, Simpan sebagai Draft</option>
                            </select>
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Status Adopsi" id="adoption_status_id" error={state.errors?.adoption_status_id}>
                            <select id="adoption_status_id" name="adoption_status_id" defaultValue={pet.adoptionStatusId} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                {adoptionStatusList.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
                            </select>
                        </FormField>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Bagian Unggah Foto --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">Foto Hewan</h2>
          <p className="mt-1 text-sm leading-6 text-darkBrown/80">Unggah foto-foto terbaru dari hewan peliharaan.</p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
                <div className="col-span-full">
                    <label htmlFor="petImages" className="block text-sm font-medium leading-6 text-darkBrown">Unggah Foto</label>
                    <p className="text-xs text-gray-500 mb-2">Gambar lama akan diganti jika Anda mengunggah yang baru.</p>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-darkBrown/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="petImages" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                    <span>Pilih foto</span>
                                    <input id="petImages" name="petImages" type="file" multiple className="sr-only" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">atau seret dan lepas</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP hingga 5MB</p>
                        </div>
                    </div>
                </div>
                {(existingImages.length > 0 || newFiles.length > 0) && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-darkBrown">Preview Gambar:</h3>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((image, index) => (
                            <div key={image.id} className="relative group">
                                <Image src={image.url} alt={pet.name} width={150} height={150} className="rounded-md object-cover aspect-square" />
                            </div>
                        ))}
                        {newFiles.map((file, index) => (
                            <div key={index} className="relative group">
                            <Image src={URL.createObjectURL(file)} alt={file.name} width={150} height={150} className="rounded-md object-cover aspect-square" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button type="button" onClick={() => handleRemoveNewFile(index)} className="p-1 bg-white rounded-full">
                                    <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                                </button>
                            </div>
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
        <Link href="/dashboard/pets" className="text-sm font-semibold leading-6 text-darkBrown">
          Batal
        </Link>
        <Button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Simpan Perubahan
        </Button>
      </div>

       {/* --- Area Notifikasi Error --- */}
       {state.message && (
        <div className="mt-4 text-center">
            <p className="text-sm text-red-600">{state.message}</p>
        </div>
       )}
    </form>
  );
}