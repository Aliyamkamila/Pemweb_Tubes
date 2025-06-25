"use client";

import { PhotoIcon, TrashIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { updatePet } from "@/app/lib/actions/pet";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Komponen kecil untuk setiap field input agar lebih rapi
function FormField({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-darkBrown">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

// Komponen utama formulir
export default function EditPetForm({ pet, speciesList, adoptionStatusList }) {
  const [files, setFiles] = useState([]);
  
  // Menggantikan useActionState dengan state lokal
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length > 0) {
      const validFiles = newFiles.filter(
        (file) => ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
      );
      setFiles((prevFiles) => [...prevFiles, ...validFiles].slice(0, 5)); // Batasi maks 5 file
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});
    setMessage('');

    const formData = new FormData(event.currentTarget);
    
    // Hapus file lama jika ada file baru yang diunggah
    if (files.length > 0) {
        formData.append('delete_existing_images', 'true');
    }

    files.forEach((file) => {
      if (file?.size > 0) {
        formData.append(`petImages`, file);
      }
    });

    // Panggil server action secara langsung
    const result = await updatePet(pet.id, null, formData);

    setIsSubmitting(false);

    if (result && result.errors) {
      setErrors(result.errors);
      setMessage(result.message || 'Gagal memperbarui data. Periksa kembali isian Anda.');
    } else if (result && result.message) {
      setMessage(result.message);
    }
    // Jika berhasil, server action akan melakukan redirect.
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-10 divide-y divide-darkBrown/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-darkBrown">
            Edit Detail Hewan
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Perbarui informasi mengenai hewan di bawah ini.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-darkBrown/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="sm:col-span-4">
                <FormField label="Nama Hewan" id="name" error={errors.name}>
                  <input type="text" name="name" id="name" defaultValue={pet.name} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>

              <div className="sm:col-span-2">
                 <FormField label="Jenis Kelamin" id="gender" error={errors.gender}>
                    <select id="gender" name="gender" defaultValue={pet.gender} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                        <option value="Male">Jantan</option>
                        <option value="Female">Betina</option>
                    </select>
                </FormField>
              </div>

              <div className="sm:col-span-2">
                <FormField label="Umur (tahun)" id="age" error={errors.age}>
                  <input type="number" name="age" id="age" defaultValue={pet.age} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>

              <div className="sm:col-span-2">
                <FormField label="Berat (kg)" id="weight" error={errors.weight}>
                  <input type="number" step="0.1" name="weight" id="weight" defaultValue={pet.weight} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>

              <div className="sm:col-span-2">
                <FormField label="Tinggi (cm)" id="height" error={errors.height}>
                    <input type="number" step="0.1" name="height" id="height" defaultValue={pet.height} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>
              
              <div className="sm:col-span-3">
                <FormField label="Spesies" id="species_id" error={errors.species_id}>
                  <select id="species_id" name="species_id" defaultValue={pet.speciesId} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                    {speciesList.map((species) => (<option key={species.id} value={species.id}>{species.name}</option>))}
                  </select>
                </FormField>
              </div>

               <div className="sm:col-span-3">
                <FormField label="Ras" id="breed" error={errors.breed}>
                  <input type="text" name="breed" id="breed" defaultValue={pet.breed} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </FormField>
              </div>

              <div className="sm:col-span-3">
                  <FormField label="Kota" id="city" error={errors.city}>
                      <input 
                          type="text" 
                          name="city" 
                          id="city" 
                          defaultValue={pet.city} 
                          className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
                      />
                  </FormField>
              </div>

              <div className="sm:col-span-3">
                  <FormField label="Provinsi" id="state" error={errors.state}>
                      <input 
                          type="text" 
                          name="state" 
                          id="state" 
                          defaultValue={pet.state} 
                          className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
                      />
                  </FormField>
              </div>
              
              <div className="sm:col-span-full">
                <FormField label="Deskripsi" id="description" error={errors.description}>
                  <textarea id="description" name="description" rows={3} defaultValue={pet.description} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
                </FormField>
              </div>

              <div className="sm:col-span-3">
                <FormField label="Status Publikasi" id="published" error={errors.published}>
                  <select id="published" name="published" defaultValue={pet.published.toString()} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                    <option value="true">Dipublikasikan</option>
                    <option value="false">Belum, Masih Sebagai Draft Terlebih Dahulu</option>
                  </select>
                </FormField>
              </div>

              <div className="sm:col-span-3">
                <FormField label="Status Adopsi" id="adoption_status_id" error={errors.adoption_status_id}>
                    <select id="adoption_status_id" name="adoption_status_id" defaultValue={pet.adoptionStatusId} className="block w-full rounded-md border-0 py-1.5 text-darkBrown shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                        {adoptionStatusList.map((status) => (<option key={status.id} value={status.id}>{status.name}</option>))}
                    </select>
                </FormField>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-darkBrown">
                  Foto Hewan
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-darkBrown/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                        <span>Unggah file</span>
                        <input id="file-upload" name="petImages" type="file" multiple className="sr-only" onChange={handleFileChange} accept={ALLOWED_MIME_TYPES.join(",")} />
                      </label>
                      <p className="pl-1">atau tarik dan lepas</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP hingga 5MB</p>
                  </div>
                </div>
                 <div className="mt-4">
                    <h3 className="text-sm font-medium text-darkBrown">Gambar Saat Ini:</h3>
                    {pet.petImages && pet.petImages.length > 0 && files.length === 0 && (
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {pet.petImages.map((image) => (
                            <div key={image.id} className="relative">
                            <Image src={image.url} alt="Pet image" width={150} height={150} className="rounded-md object-cover" />
                            </div>
                        ))}
                        </div>
                    )}
                    {(files.length > 0) && (
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative">
                            <Image src={URL.createObjectURL(file)} alt="Preview" width={150} height={150} className="rounded-md object-cover" />
                            <button type="button" onClick={() => removeFile(index)} className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full">
                                <TrashIcon className="h-4 w-4" />
                            </button>
                            </div>
                        ))}
                        </div>
                    )}
                    {pet.petImages.length === 0 && files.length === 0 && <p className="text-sm text-gray-500">Tidak ada gambar.</p>}
                    <p className="mt-2 text-xs text-gray-500">Mengunggah gambar baru akan menggantikan semua gambar lama.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            {message && Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                    <ExclamationCircleIcon className="h-5 w-5" /> {message}
                </div>
            )}
            <Link href="/dashboard/pets" className="text-sm font-semibold leading-6 text-gray-900">
                Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400">
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}e