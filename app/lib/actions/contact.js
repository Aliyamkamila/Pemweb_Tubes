"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { revalidatePath, redirect } from "next/cache"; // Import diperbaiki

const ContactFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Pesan tidak boleh kosong." }),
  createdAt: z.string(),
});

const CreateContactMessage = ContactFormSchema.omit({
  id: true,
  createdAt: true,
});

// Aksi untuk membuat pesan baru dari halaman kontak publik
export async function createContactMessage(prevState, formData) {
  const validatedFields = CreateContactMessage.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal Mengirim Pesan. Harap periksa kembali isian Anda.",
    };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        message: validatedFields.data.message,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Gagal Membuat Pesan Kontak.",
    };
  }

  revalidatePath("/contact");
  return {
    message: "Pesan berhasil dikirim!",
    errors: {},
  };
}

// Aksi untuk mengubah status pesan dari tabel dasbor
export async function updateContactStatus(prevState, formData) {
  const id = formData.get("id");
  const newStatus = formData.get("status");

  try {
    await prisma.contactMessage.update({
      where: { id: id },
      data: { status: newStatus },
    });
    revalidatePath("/dashboard/adoptions");
    return { message: `Status berhasil diubah menjadi "${newStatus}".` };
  } catch (error) {
    return { message: "Database Error: Gagal memperbarui status." };
  }
}

// --- FUNGSI BARU UNTUK HALAMAN EDIT ---
// Aksi untuk memperbarui seluruh data pesan dari halaman edit
export async function updateContactMessage(id, prevState, formData) {
    const validatedFields = CreateContactMessage.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Gagal Memperbarui Pesan. Harap periksa kembali isian Anda.',
      };
    }
    
    const { name, email, phone, message } = validatedFields.data;

    try {
      await prisma.contactMessage.update({
        where: { id: id },
        data: { name, email, phone, message },
      });
    } catch (error) {
      return { message: 'Database Error: Gagal memperbarui pesan.' };
    }

    revalidatePath('/dashboard/adoptions');
    redirect('/dashboard/adoptions');
  }

// Aksi untuk menghapus pesan
export async function deleteContactMessage(id) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/dashboard/adoptions");
    return { message: "Pesan berhasil dihapus." };
  } catch (error) {
    return { message: "Database Error: Gagal menghapus pesan." };
  }
}