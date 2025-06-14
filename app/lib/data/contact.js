// app/lib/data/contact.js
import prisma from "@/app/lib/prisma";

export async function getMessageById(id) {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });
    return message;
  } catch (error) {
    console.error("Gagal mengambil pesan berdasarkan ID:", error);
    return null;
  }
}
