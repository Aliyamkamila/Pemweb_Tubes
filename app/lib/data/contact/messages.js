// app/lib/data/contact/messages.js
import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10; // PERBAIKAN: Nama variabel yang benar

// Mengambil pesan dengan filter dan paginasi untuk tabel dashboard
export async function fetchFilteredContactMessages(rawQuery, rawCurrentPage) { // Mengubah nama parameter untuk kejelasan
  noStore();

  // PERBAIKAN: Memastikan 'query' selalu berupa string. Jika 'rawQuery' undefined/null, akan jadi string kosong.
  const query = typeof rawQuery === 'string' ? rawQuery : '';

  // PERBAIKAN: Memastikan 'currentPage' selalu berupa angka yang valid. Jika 'rawCurrentPage' undefined/null/NaN, akan jadi 1.
  const currentPage = (typeof rawCurrentPage === 'number' && !isNaN(rawCurrentPage)) ? rawCurrentPage : 1;
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

  // --- DEBUGGING LOGS (Bisa dihapus setelah masalah teratasi) ---
  console.log('DEBUG: query yang diterima di messages.js:', query);
  console.log('DEBUG: currentPage yang diterima di messages.js:', currentPage);
  console.log('DEBUG: offset yang dihitung di messages.js:', offset);
  // --- AKHIR DEBUGGING LOGS ---

  try {
    const messages = await prisma.contactMessage.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } }, // Menggunakan 'query' yang sudah dipastikan string
          { email: { contains: query, mode: 'insensitive' } },
          { message: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset, // Menggunakan 'offset' yang sudah dipastikan angka
    });
    // Memastikan semua pesan dapat diserialisasi dengan mengkonversi objek Date
    return messages.map(message => ({
      ...message,
      createdAt: message.createdAt ? message.createdAt.toISOString() : null,
      updatedAt: message.updatedAt ? message.updatedAt.toISOString() : null, // Asumsi updatedAt mungkin ada di skema Anda
    }));
  } catch (error) {
    console.error('Database Error:', error); // Di sinilah error Prisma dicatat
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

        // Memastikan objek Date dikonversi ke string ISO untuk serialisasi
        if (message) {
            if (message.createdAt) {
                message.createdAt = message.createdAt.toISOString();
            }
            if (message.updatedAt) { 
                message.updatedAt = message.updatedAt.toISOString();
            }
            // Tambahkan bidang tanggal lain jika skema ContactMessage Anda memilikinya
        }

        return message;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Gagal mengambil data pesan.');
    }
}