// Lokasi: app/lib/actions/pet.js

"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// --- PERBAIKAN DI SINI ---
// Mengubah path impor menjadi absolut menggunakan alias @/
import { checkAdmin } from "@/app/lib/actions/authorization";
import fs from "node:fs/promises";
import path from "node:path";

// Skema validasi untuk data teks
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
  published: z.boolean(),
  adoption_status_id: z.string(),
});

const CreatePet = PetFormSchema.omit({ id: true });
const UpdatePet = PetFormSchema.omit({ id: true });

// === FUNGSI CREATE PET ===
export async function createPet(prevState, formData) {
  let pet; 
  try {
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
      published: formData.get("published") === "true",
      adoption_status_id: formData.get("adoption_status_id"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Data tidak lengkap. Gagal menambahkan hewan.",
      };
    }
    
    pet = await prisma.pet.create({
      data: validatedFields.data,
    });

    const files = formData.getAll('images');
    if (files && files.length > 0 && files[0].size > 0) {
      const imagePromises = files.map(async (file) => {
        if (!(file instanceof File) || file.size === 0) return;
        if (file.size > 10 * 1024 * 1024) {
            throw new Error(`File ${file.name} terlalu besar.`);
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        
        await fs.mkdir(uploadDir, { recursive: true });
        
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        
        const imageUrl = `/uploads/${filename}`;

        return prisma.petImage.create({
          data: {
            url: imageUrl,
            petId: pet.id,
          },
        });
      });

      await Promise.all(imagePromises);
    }

  } catch (error) {
    console.error("Error saat membuat data hewan:", error);
    if (pet?.id) {
        await prisma.pet.delete({ where: { id: pet.id }});
    }
    return {
      message: "Error Internal: Gagal menambahkan hewan. " + error.message,
    };
  }

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

  try {
    await prisma.pet.update({
      where: { id: id },
      data: validatedFields.data,
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