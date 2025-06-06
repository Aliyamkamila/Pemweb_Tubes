"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { rolesWithPermission } from "@/app/lib/actions/authorization";
import { idSchema } from "@/app/lib/schemas/common";
import { z } from "zod";

// Define a schema for the user form
const updateUserFormSchema = z.object({
  role: z.enum(["user", "employee"], {
    invalid_type_error: "Silakan pilih peran.",
  }),
});

export async function deleteUser(id) {
  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin"]);
  if (!hasPermission) {
    throw new Error("Akses Ditolak. Gagal Menghapus Pengguna.");
  }

  // Validate the id at runtime
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    throw new Error();
  }
  const validatedId = parsedId.data;

  // Delete the user
  try {
    await prisma.user.delete({
      where: { id: validatedId },
    });

    // Revalidate the cache
    revalidatePath("/dashboard/users");
  } catch (error) {
    return {
      message: "Kesalahan Basis Data: Gagal menghapus pengguna.",
    };
  }
}

export async function updateUser(id, prevState, formData) {
  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin"]);
  if (!hasPermission) {
    throw new Error("Akses Ditolak. Gagal Memperbarui Pengguna.");
  }

  // Validate the id at runtime
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    return {
      message: "ID Pengguna Tidak Valid. Gagal Memperbarui Pengguna.",
    };
  }
  const validatedId = parsedId.data;

  // Validate the form data using Zod
  const validatedFields = updateUserFormSchema.safeParse({
    role: formData.get("role"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada Field yang Hilang. Gagal Memperbarui Pengguna.",
    };
  }
  // Prepare data for insertion into the database
  const { role } = validatedFields.data;

  // Update the user in the database
  try {
    await prisma.user.update({
      where: { id: validatedId },
      data: {
        role: role,
      },
    });
  } catch (error) {
    return {
      message: "Kesalahan Basis Data: Gagal Memperbarui Pengguna.",
    };
  }

  // Revalidate the cache
  revalidatePath("/dashboard/users");

  // Redirect to the users page
  redirect("/dashboard/users");
}
