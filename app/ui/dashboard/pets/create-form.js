// Lokasi: app/lib/actions/pet.js

"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkAdmin } from "./authorization";

// Skema validasi menggunakan Zod
const PetFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  age: z.string().min(1, { message: "Umur tidak boleh kosong." }),
  gender: z.string(),
  species_id: z.string(),
  breed: z.string().min(1, { message: "Jenis tidak boleh kosong." }),
  weight: z.string().min(1, { message: "Berat tidak boleh kosong." }),
  height: z.string().min(1, { message: "Tinggi tidak boleh kosong." }),
  city: z.string().min(1, { message: "Kota tidak boleh kosong." }),
  state: z.string().min(1, { message: "Provinsi tidak boleh kosong." }),
  description: z.string().min(1, { message: "Deskripsi tidak boleh kosong." }),
  // 'published' diubah menjadi boolean untuk mencocokkan skema database
  published: z.boolean(),
  adoption_status_id: z.string(),
});

const CreatePet = PetFormSchema.omit({ id: true });
const UpdatePet = PetFormSchema.omit({ id: true });

// === FUNGSI CREATE PET ===
// Pastikan fungsinya memiliki parameter (prevState, formData)
export async function createPet(prevState, formData) {
  // if (!checkAdmin()) {
  //   return {
  //     message: "Unauthorized",
  //   };
  // }

  try {
    // Validasi form menggunakan Zod
    const validatedFields = CreatePet.safeParse({
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      species_id: formData.get("species_id"),
      breed: formData.get("breed"),
      weight: formData.get("weight"),
      height: formData.get("height"),
      city: formData.get("city"),
      state: formData.get("state"),
      description: formData.get("description"),
      // Konversi nilai string 'true'/'false' dari form menjadi boolean
      published: formData.get("published") === "true",
      adoption_status_id: formData.get("adoption_status_id"),
    });

    // Jika validasi gagal, kembalikan errors
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Data tidak lengkap. Gagal menambahkan hewan.",
      };
    }
    
    // Hapus properti gambar jika ada, sebelum memasukkan ke database
    const { image, ...petData } = validatedFields.data;

    // Masukkan data ke database
    await prisma.pet.create({
      data: petData,
    });

  } catch (error) {
    console.error(error);
    return {
      message: "Error Database: Gagal menambahkan hewan.",
    };
  }

  // Revalidasi cache dan redirect
  revalidatePath("/dashboard/pets");
  redirect("/dashboard/pets");
}

// === FUNGSI UPDATE PET ===
export async function updatePet(id, prevState, formData) {
  const validatedFields = UpdatePet.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    species_id: formData.get("species_id"),
    breed: formData.get("breed"),
    weight: formData.get("weight"),
    height: formData.get("height"),
    city: formData.get("city"),
    state: formData.get("state"),
    description: formData.get("description"),
    published: formData.get("published") === "true",
    adoption_status_id: formData.get("adoption_status_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak lengkap. Gagal memperbarui data hewan.",
    };
  }

  const { image, ...petData } = validatedFields.data;

  try {
    await prisma.pet.update({
      where: { id: id },
      data: petData,
    });
  } catch (error) {
    return { message: "Error Database: Gagal memperbarui data hewan." };
  }

  revalidatePath("/dashboard/pets");
  redirect("/dashboard/pets");
}

// === FUNGSI DELETE PET ===
export async function deletePet(id) {
  try {
    await prisma.pet.delete({
      where: { id },
    });
    revalidatePath("/dashboard/pets");
    return { message: "Hewan berhasil dihapus." };
  } catch (error) {
    return { message: "Error Database: Gagal menghapus hewan." };
  }
}