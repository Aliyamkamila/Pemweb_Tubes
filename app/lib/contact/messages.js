import prisma from "@/app/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredContactMessages(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const messages = await prisma.contactMessage.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query } },
          { message: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return messages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil pesan kontak.");
  }
}

export async function fetchContactMessagesPages(query) {
  try {
    const count = await prisma.contactMessage.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query } },
          { message: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal menghitung total halaman pesan.");
  }
}

// --- FUNGSI BARU UNTUK HALAMAN EDIT ---
export async function fetchContactMessageById(id) {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: id },
    });
    return message;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil data pesan.");
  }
}