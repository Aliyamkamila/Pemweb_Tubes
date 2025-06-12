// File: app/lib/data/contact/messages.js

// ... (fungsi yang sudah ada tetap di atas)

export async function fetchContactMessageById(id) {
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