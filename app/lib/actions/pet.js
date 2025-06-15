// Lokasi: app/lib/actions/pet.js
"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";

const PetFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  age: z.coerce.number().int().positive({ message: "Umur harus angka positif." }),
  gender: z.string(),
  species_id: z.string({ required_error: "Spesies harus dipilih." }),
  breed: z.string().min(1, { message: "Jenis tidak boleh kosong." }),
  weight: z.coerce.number().positive({ message: "Berat harus angka positif." }),
  height: z.coerce.number().positive({ message: "Tinggi harus angka positif." }),
  city: z.string().min(1, { message: "Kota tidak boleh kosong." }),
  state: z.string().min(1, { message: "Provinsi tidak boleh kosong." }),
  description: z.string().min(1, { message: "Deskripsi tidak boleh kosong." }),
  published: z.boolean(),
  adoption_status_id: z.string({ required_error: "Status adopsi harus dipilih." }),
});

const CreatePet = PetFormSchema.omit({ id: true });

export async function createPet(prevState, formData) {
  // 1. Validasi field
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
    console.log("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak lengkap. Gagal menambahkan hewan.",
    };
  }

  // Pisahkan ID relasi dari sisa data
  const { adoption_status_id, species_id, ...otherPetData } = validatedFields.data;

  let petId = null;
  try {
    // 2. Buat data hewan dengan 'connect' untuk relasi
    const pet = await prisma.pet.create({
      data: {
        ...otherPetData,
        // Gunakan 'connect' untuk membuat relasi ke tabel lain
        species: {
          connect: { id: species_id },
        },
        adoptionStatus: {
          connect: { id: adoption_status_id },
        },
      },
    });
    petId = pet.id; // Simpan ID untuk relasi gambar

    // 3. Proses unggah gambar
    const files = formData.getAll("images");
    if (files && files.length > 0 && files[0].size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const imagePromises = files.map(async (file) => {
        if (!(file instanceof File) || file.size === 0) return null;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const filepath = path.join(uploadDir, filename);
        
        await fs.writeFile(filepath, buffer);

        return prisma.petImage.create({
          data: {
            url: `/uploads/${filename}`,
            petId: petId,
          },
        });
      });

      await Promise.all(imagePromises);
    }
  } catch (error) {
    console.error("==========================================");
    console.error("ERROR SAAT CREATE PET:", error);
    console.error("==========================================");

    if (petId) {
      await prisma.pet.delete({ where: { id: petId } }).catch(e => 
        console.error("Gagal melakukan rollback data hewan:", e)
      );
    }
    
    if (error.code === 'EACCES') {
         return { message: "Error Izin File: Gagal menyimpan gambar. Periksa izin folder 'public/uploads'." };
    }
    return { message: `Terjadi Error di Server: ${error.message}` };
  }

  revalidatePath("/dashboard/pets");
  redirect("/dashboard/pets");
}


// === FUNGSI UPDATE PET (JUGA DIPERBAIKI) ===
export async function updatePet(id, prevState, formData) {
  const UpdatePet = PetFormSchema.omit({ id: true });
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
  
  const { adoption_status_id, species_id, ...otherPetData } = validatedFields.data;

  try {
    await prisma.pet.update({
      where: { id: id },
      data: {
        ...otherPetData,
        species: {
          connect: { id: species_id },
        },
        adoptionStatus: {
          connect: { id: adoption_status_id },
        },
      },
    });
  } catch (error) {
     console.error("ERROR SAAT UPDATE PET:", error);
    return { message: "Error Database: Gagal memperbarui data hewan." };
  }

  revalidatePath("/dashboard/pets");
  redirect("/dashboard/pets");
}


// === FUNGSI DELETE PET ===
export async function deletePet(id) {
  try {
    // Hapus gambar terkait terlebih dahulu
    await prisma.petImage.deleteMany({
      where: { petId: id },
    });
    
    // Baru hapus data hewannya
    await prisma.pet.delete({
      where: { id },
    });
    revalidatePath("/dashboard/pets");
    return { message: "Hewan berhasil dihapus." };
  } catch (error) {
     console.error("ERROR SAAT DELETE PET:", error);
    return { message: "Error Database: Gagal menghapus hewan." };
  }
}