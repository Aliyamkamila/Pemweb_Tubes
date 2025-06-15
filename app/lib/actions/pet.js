// Lokasi: app/lib/actions/pet.js

"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "node:path";
import fs from "node:fs/promises";

// Skema validasi untuk form hewan
const PetFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  age: z.coerce.number().gt(0, { message: "Umur harus lebih dari 0." }),
  gender: z.enum(["Male", "Female"], {
    invalid_type_error: "Pilih jenis kelamin.",
  }),
  species_id: z.string({ required_error: "Pilih spesies." }),
  breed: z.string().min(1, { message: "Jenis tidak boleh kosong." }),
  weight: z.coerce.number().gt(0, { message: "Berat harus lebih dari 0." }),
  height: z.coerce.number().gt(0, { message: "Tinggi harus lebih dari 0." }),
  city: z.string().min(1, { message: "Kota tidak boleh kosong." }),
  state: z.string().min(1, { message: "Provinsi tidak boleh kosong." }),
  description: z.string().optional(),
  published: z.boolean(),
  adoption_status_id: z.string({ required_error: "Pilih status adopsi." }),
});

const CreatePet = PetFormSchema.omit({ id: true });
const UpdatePet = PetFormSchema.omit({ id: true });

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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak lengkap. Gagal membuat data hewan.",
    };
  }

  // 2. Siapkan data untuk database
  const { species_id, adoption_status_id, ...otherPetData } = validatedFields.data;

  // 3. Proses unggah gambar
  const files = formData.getAll("images");
  let petImageUrls = [];
  if (files && files.length > 0 && files[0].size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const filepath = path.join(uploadDir, filename);
        await fs.writeFile(filepath, buffer);
        petImageUrls.push({ url: `/uploads/${filename}` });
      }
    }
  }

  // 4. Simpan ke database
  try {
    await prisma.pet.create({
      data: {
        ...otherPetData,
        species: { connect: { id: species_id } },
        adoptionStatus: { connect: { id: adoption_status_id } },
        images: {
          create: petImageUrls,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Error Database: Gagal membuat data hewan." };
  }

  revalidatePath("/dashboard/pets");
  redirect("/dashboard/pets");
}

export async function updatePet(id, prevState, formData) {
  // 1. Validasi field
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
  
  // 2. Siapkan data untuk database
  const { species_id, adoption_status_id, ...otherPetData } = validatedFields.data;

  try {
    // 3. Update data teks hewan
    await prisma.pet.update({
      where: { id: id },
      data: {
        ...otherPetData,
        species: { connect: { id: species_id } },
        adoptionStatus: { connect: { id: adoption_status_id } },
      },
    });

    // 4. Proses unggah gambar baru
    const files = formData.getAll("petImages");
    if (files && files.length > 0 && files[0].size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const imagePromises = files.map(async (file) => {
        if (file instanceof File && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
          const filepath = path.join(uploadDir, filename);
          await fs.writeFile(filepath, buffer);

          // Simpan URL gambar baru ke database
          return prisma.petImage.create({
            data: {
              url: `/uploads/${filename}`,
              petId: id,
            },
          });
        }
        return null;
      });

      await Promise.all(imagePromises);
    }

  } catch (error) {
     console.error("ERROR SAAT UPDATE PET:", error);
    return { message: "Error Database: Gagal memperbarui data hewan." };
  }

  revalidatePath("/dashboard/pets");
  revalidatePath(`/dashboard/pets/${id}/edit`);
  redirect("/dashboard/pets");
}


export async function deletePet(id) {
  try {
    // Hapus gambar terkait terlebih dahulu
    await prisma.petImage.deleteMany({
      where: { petId: id },
    });
    // Baru hapus hewannya
    await prisma.pet.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/pets");
    return { message: "Hewan berhasil dihapus." };
  } catch (error) {
    return { message: "Error Database: Gagal menghapus hewan." };
  }
}