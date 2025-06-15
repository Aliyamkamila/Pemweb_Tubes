"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ... (createContactMessage tetap sama)
const ContactFormSchema = z.object({
  name: z.string().min(3, { message: "Nama harus diisi, minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Pesan harus diisi, minimal 10 karakter." }),
});

export async function createContactMessage(prevState, formData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mengirim pesan. Silakan periksa kembali isian Anda.",
      success: false,
    };
  }

  try {
    const { name, email, phone, message } = validatedFields.data;
    await prisma.contactMessage.create({
      data: { name, email, phone, message, status: 'Belum dihubungi' },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Gagal menyimpan pesan.", success: false, errors: {} };
  }

  revalidatePath("/dashboard/adoptions");
  return { message: "Pesan Anda berhasil dikirim!", success: true, errors: {} };
}


/**
 * =======================================
 * SKEMA VALIDASI & AKSI UNTUK UBAH STATUS (DISEDERHANAKAN)
 * =======================================
 */
const UpdateStatusSchema = z.object({
  id: z.string(),
  // DIUBAH: Status "Selesai" dihapus
  status: z.enum(["Belum dihubungi", "Sudah dihubungi"], {
    invalid_type_error: "Pilih status yang valid.",
  }),
});

export async function updateContactMessageStatus(id, formData) {
  try {
    const validatedData = UpdateStatusSchema.parse({
      id: id,
      status: formData.get("status"),
    });

    await prisma.contactMessage.update({
      where: { id: validatedData.id },
      data: { status: validatedData.status },
    });

  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Gagal memperbarui status pesan." };
  }

  revalidatePath("/dashboard/adoptions");
  redirect("/dashboard/adoptions");
}

/**
 * =======================================
 * AKSI UNTUK HAPUS PESAN
 * =======================================
 */
export async function deleteContactMessage(id) {
  try {
    await prisma.contactMessage.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/adoptions");
    return { message: "Pesan berhasil dihapus." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Gagal menghapus pesan." };
  }
}
