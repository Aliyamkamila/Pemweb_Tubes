import path from "path";
import { writeFile } from "fs/promises";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "@/app/lib/constants";
import { rolesWithPermission } from "../actions/authorization";

// Validate and upload images
export async function validateAndUploadImages(petImages) {
  // Check if the user has permission to upload images
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak. Gagal membuat hewan.");
  }
  
  const imageUrlArray = [];

  if (petImages.length === 0) {
    return imageUrlArray;
  }

  // Validate petImages
  for (const file of petImages) {
    // Check if the file is an instance of File
    if (!(file instanceof File)) {
      return {
        errors: { image_url: ["Unggahan file tidak valid."] },
        message: "Input tidak valid. Gagal memperbarui hewan.",
      };
    }
    // Check if the file size is greater than the maximum file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        errors: { petImages: ["Ukuran file terlalu besar"] },
        message: "Gagal memperbarui hewan.",
      };
    }
    // Check if the file type is in the allowed mime types
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        errors: { petImages: ["Tipe file tidak valid"] },
        message: "Gagal memperbarui hewan.",
      };
    }
  }

  // upload images
  try {
    // Pastikan Buffer tersedia di lingkungan Node.js
    const { Buffer } = await import('buffer');
    const uploadPromises = petImages.map(async (file) => {
      // Convert the file to a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      // Generate a unique filename
      const filename = Date.now() + file.name.replaceAll(" ", "_");

      // Write the file to the uploads directory
      try {
        const filePath = path.join(process.cwd(), "public/uploads/" + filename);
        await writeFile(filePath, buffer);
        // Add the image URL to uploadPromises
        return "/uploads/" + filename;
      } catch (error) {
        console.error("Error writing file:", error);
        throw new Error("Gagal mengunggah gambar: " + file.name);
      }
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading images:", error);
    return {
      message: "Gagal mengunggah satu atau lebih gambar.",
    };
  }
}

// File sudah diubah ke JavaScript murni: tidak ada anotasi tipe, interface, atau type alias.
// Anda bisa langsung mengganti ekstensi file menjadi .js tanpa perubahan kode tambahan.