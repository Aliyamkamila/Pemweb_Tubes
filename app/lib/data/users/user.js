import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { rolesWithPermission } from "@/app/lib/actions/authorization";
import { z } from "zod";
import { idSchema } from "../../schemas/common";

const fetchFilteredUsersSchema = z.object({
  parsedQuery: z.string(),
  parsedCurrentPage: z.number(),
});

const fetchUserPagesSchema = z.string();

export async function fetchFilteredUsers(query, currentPage) {
  noStore();
  const hasPermission = await rolesWithPermission(["admin"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak");
  }

  const parsedData = fetchFilteredUsersSchema.safeParse({
    parsedQuery: query,
    parsedCurrentPage: currentPage,
  });
  if (!parsedData.success) {
    throw new Error("Tipe tidak valid.");
  }
  const { parsedQuery, parsedCurrentPage } = parsedData.data;
  const offset = (parsedCurrentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: parsedQuery,
          mode: "insensitive",
        },
        role: {
          not: "admin",
        },
      },
      select: {
        id: true,
        email: true,
        image: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset, // Perbaikan ada di sini
    });
    return users;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching users.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data pengguna.");
  }
}

export async function fetchUserPages(query) {
  noStore();
  const hasPermission = await rolesWithPermission(["admin"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak");
  }

  const parsedQuery = fetchUserPagesSchema.safeParse(query);
  if (!parsedQuery.success) {
    throw new Error("Tipe tidak valid.");
  }
  const validatedQuery = parsedQuery.data;

  try {
    const count = await prisma.user.count({
      where: {
        email: {
          contains: validatedQuery,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching user pages.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil halaman pengguna.");
  }
}

export async function fetchUserById(id) {
  noStore();
  const hasPermission = await rolesWithPermission(["admin"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    throw new Error("Format ID tidak valid.");
  }
  const validatedId = parsedId.data;
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: validatedId,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return user;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching user.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data pengguna.");
  }
}