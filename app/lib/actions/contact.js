"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// Schema validasi form kontak
const ContactFormSchema = z.object({
  name: z.string().min(3, { message: "Nama harus diisi minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().optional().nullable(),
  message: z.string().min(10, { message: "Pesan harus diisi minimal 10 karakter." }),
});

// 📨 Create Contact Message
export async function createContactMessage(prevState, formData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mengirim pesan. Harap periksa kembali isian Anda.",
    };
  }

  const { name, email, phone, message } = validatedFields.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message,
        status: "Belum dihubungi",
      },
    });

    revalidatePath("/dashboard/adoptions");

    return {
      message: "Pesan berhasil dikirim successfully",
      errors: {},
    };
  } catch (error) {
    console.error("Database Error: Failed to create contact message", error);
    return {
      message: "Terjadi kesalahan server saat mengirim pesan.",
      errors: {},
    };
  }
}

export async function updateContactMessage(prevState, formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { name, email, phone, message },
    });

    revalidatePath("/dashboard/adoptions");
    return { message: "Pesan berhasil diperbarui successfully" };
  } catch (error) {
    console.error("Gagal update pesan:", error);
    return { message: "Gagal update pesan" };
  }
}

// 🗑️ Delete Contact Message
export async function deleteContactMessage(id) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/dashboard/adoptions");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Gagal menghapus pesan.");
  }
}
