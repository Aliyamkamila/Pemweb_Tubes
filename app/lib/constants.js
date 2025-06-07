// File baru: app/lib/actions/contact.js

"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";

// Skema validasi untuk data formulir
const ContactSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Pesan tidak boleh kosong." }),
});

// Fungsi untuk menyimpan pesan
export async function createContactMessage(prevState, formData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  // Jika validasi gagal, kembalikan error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mengirim pesan. Silakan periksa kembali isian Anda.",
    };
  }

  // Simpan data ke database
  try {
    await prisma.contactMessage.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        message: validatedFields.data.message,
      },
    });

    return { message: "Pesan Anda telah berhasil dikirim!" };
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada database. Gagal mengirim pesan.",
    };
  }
}