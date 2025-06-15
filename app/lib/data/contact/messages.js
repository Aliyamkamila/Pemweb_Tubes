import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

// Mengambil pesan dengan filter dan paginasi untuk tabel dashboard
export async function fetchFilteredContactMessages(query, currentPage) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const messages = await prisma.contactMessage.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { message: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return messages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Gagal mengambil data pesan.');
  }
}

// Menghitung total halaman untuk paginasi
export async function fetchContactMessagesPages(query) {
  noStore();
  try {
    const count = await prisma.contactMessage.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { message: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Gagal menghitung total halaman.');
  }
}

// Mengambil satu pesan berdasarkan ID untuk halaman edit
export async function fetchContactMessageById(id) {
    noStore();
    try {
        const message = await prisma.contactMessage.findUnique({
            where: { id: id },
        });
        return message;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Gagal mengambil data pesan.');
    }
}
