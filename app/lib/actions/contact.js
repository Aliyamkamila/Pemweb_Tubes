// app/lib/actions/contact.js
"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma"; // Pastikan Anda memiliki instance Prisma client
import { revalidatePath } from "next/cache";

// Definisikan schema untuk validasi input form kontak
const ContactFormSchema = z.object({
  name: z.string().min(3, { message: "Nama harus diisi minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().optional().nullable(), // Nomor telepon opsional dan bisa null
  message: z.string().min(10, { message: "Pesan harus diisi minimal 10 karakter." }),
});

export async function createContactMessage(prevState, formData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  // Jika validasi gagal, kembalikan error
  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mengirim pesan. Harap periksa kembali isian Anda.", // Pesan error untuk toast
    };
  }

  const { name, email, phone, message } = validatedFields.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: name,
        email: email,
        phone: phone, // Akan menyimpan null jika tidak diisi
        message: message,
        status: "Belum dihubungi", // Atur status awal
      },
    });

    // Revalidate cache untuk halaman adopsi (dashboard admin)
    revalidatePath("/dashboard/adoptions");
    revalidatePath("/dashboard/adoptions/page.js"); // Pastikan path ini benar jika berbeda

    // Mengembalikan pesan sukses yang akan ditangkap oleh useEffect di komponen klien
    return {
      message: "Pesan berhasil dikirim successfully", // Kata kunci "successfully" penting untuk deteksi di useEffect
      errors: {}, // Kosongkan errors karena sukses
    };
  } catch (error) {
    console.error("Database Error: Failed to create contact message", error);
    return {
      message: "Terjadi kesalahan server saat mengirim pesan. Silakan coba lagi nanti.", // Pesan error untuk toast
      errors: {},
    };
  }
}