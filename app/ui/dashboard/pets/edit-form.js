"use client";

import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { updatePet } from "@/app/lib/actions/pet";
import { useActionState } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Komponen kecil untuk setiap field input agar lebih rapi
function FormField({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-darkBrown">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Komponen utama formulir
export default function EditPetForm({ pet, speciesList, adoptionStatusList }) {
  const [files, setFiles] = useState([]);
  const updatePetWithId = updatePet.bind(null, pet.id);
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(updatePetWithId, initialState);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files) {
      const validFiles = Array.from(files).filter(
        (file) => ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
      );
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const droppedFiles = Array.from(event.dataTransfer.items)
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile())
        .filter(
          (file) => file && ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
        );
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    files.forEach((file) => {
      if (file?.size > 0) {
        formData.append(`petImages`, file);
      }
    });
    dispatch(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-10 divide-y divide-darkBrown/10">
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
                <FormField label="Nama" id="name">
                  <input type="text" name="name" id="name" defaultValue={pet.name} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
                {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}
              </div>
              <div className="sm:col-span-2">
                <FormField label="Jenis Kelamin" id="gender">
                    <select id="gender" name="gender" defaultValue={pet.gender} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                        <option value="male">Jantan</option>
                        <option value="female">Betina</option>
                    </select>
                </FormField>
              </div>
              <div className="sm:col-span-full">
                <FormField label="Deskripsi" id="description">
                    <textarea id="description" name="description" rows={3} defaultValue={pet.description} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
                <p className="mt-2 text-xs leading-5 text-gray-500">Tulis beberapa kalimat tentang hewan ini.</p>
                {state.errors?.description && <p className="mt-2 text-sm text-red-500">{state.errors.description[0]}</p>}
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
                        <FormField label="Umur (Tahun)" id="age">
                            <input type="number" name="age" id="age" defaultValue={pet.age} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField label="Berat (kg)" id="weight">
                            <input type="number" name="weight" id="weight" defaultValue={pet.weight} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField label="Tinggi (cm)" id="height">
                            <input type="number" name="height" id="height" defaultValue={pet.height} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Spesies" id="species_id">
                            <select id="species_id" name="species_id" defaultValue={pet.speciesId} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                {speciesList.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Ras" id="breed">
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
                        <FormField label="Kota" id="city">
                            <input type="text" name="city" id="city" defaultValue={pet.city} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Provinsi" id="state">
                            <input type="text" name="state" id="state" defaultValue={pet.state} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Publikasi" id="published">
                            <select id="published" name="published" defaultValue={pet.published ? "true" : "false"} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                <option value="true">Ya, Publikasikan</option>
                                <option value="false">Tidak, Simpan sebagai Draft</option>
                            </select>
                        </FormField>
                    </div>
                    <div className="sm:col-span-3">
                        <FormField label="Status Adopsi" id="adoption_status_id">
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
                    <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-darkBrown">Unggah Foto</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-darkBrown/25 px-6 py-10" onDrop={handleDrop} onDragOver={handleDragOver}>
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                    <span>Pilih foto</span>
                                    <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">atau seret dan lepas</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP hingga 5MB</p>
                        </div>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-darkBrown">Foto baru yang akan diunggah:</h3>
                        <div className="mt-2 space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Image src={URL.createObjectURL(file)} alt={file.name} width={40} height={40} className="rounded object-cover"/>
                                <span className="font-medium truncate">{file.name}</span>
                                <span className="text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                                <button type="button" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}>
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700" />
                                </button>
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
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Simpan Perubahan
        </button>
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