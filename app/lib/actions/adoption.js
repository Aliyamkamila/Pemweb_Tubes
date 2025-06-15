// app/lib/actions/adoption.js
"use server";

import { prisma } from "@/lib/prisma";

/**
 * Fungsi untuk mengupdate data adopsi berdasarkan ID
 * @param {string} id - ID adopsi
 * @param {object} data - Data yang akan diperbarui (misalnya status, notes, dll)
 */
export async function updateAdoption(id, data) {
  try {
    const updated = await prisma.adoption.update({
      where: { id },
      data,
    });
    return updated;
  } catch (error) {
    console.error("Gagal update adopsi:", error);
    throw new Error("Gagal memperbarui data adopsi");
  }
}
