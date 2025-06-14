import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { rolesWithPermission } from "@/app/lib/actions/authorization";
import { z } from "zod";
import { idSchema } from "../../schemas/common";

// Define a schema for fetchPetsPages
const fetchPetsPagesSchema = z.string();

// Define a schema for fetchFilteredPets
const fetchFilteredPetsSchema = z.object({
  parsedQuery: z.string(),
  parsedCurrentPage: z.number(),
});

export async function fetchPetCardData() {
  // Disable caching
  noStore();

  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak");
  }

  // Get pet card data
  try {
    const totalPets = await prisma.pet.count();
    const adoptedPetsCount = await prisma.pet.count({
      // Adopted status
      where: {
        adoptionStatusId: "2609d1ce-f62b-42e3-a649-0129ace0152b",
      },
    });
    const pendingPetsCount = await prisma.pet.count({
      // Pending status
      where: {
        adoptionStatusId: "09fe1188-741e-4a97-a9ad-0cfd094ee247",
      },
    });
    const availablePetsCount = await prisma.pet.count({
      // Available status
      where: {
        adoptionStatusId: "640566d8-2619-4764-8660-61a39baf075e",
      },
    });
    // add a 4 seconds delay to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    return {
      totalPets,
      adoptedPetsCount,
      pendingPetsCount,
      availablePetsCount,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching card data.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data kartu.");
  }
}

export async function fetchPetsPages(query) {
  // Disable caching
  noStore();

  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  // Parse the query
  const parsedQuery = fetchPetsPagesSchema.safeParse(query);
  if (!parsedQuery.success) {
    throw new Error("Tipe tidak valid.");
  }
  const validatedQuery = parsedQuery.data;

  // Get the total number of pets that contains the query
  try {
    const count = await prisma.pet.count({
      where: {
        name: {
          contains: validatedQuery,
          mode: "insensitive",
        },
      },
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    // return the total number of pages
    return totalPages;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching pets pages.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil halaman hewan.");
  }
}

// Konversi ke JavaScript dari TypeScript
export async function fetchLatestPets() {
  // Disable caching
  noStore();

  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  // Get the latest pets
  try {
    const latestPets = await prisma.pet.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        city: true,
        state: true,
        petImages: {
          select: { url: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // add a 4 seconds delay to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    return latestPets;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching latest pets.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil hewan terbaru.");
  }
}

// data for the pets table in the dashboard
export async function fetchFilteredPets(query, currentPage) {
  // Disable caching
  noStore();

  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  // Parse the query and currentPage
  const parsedData = fetchFilteredPetsSchema.safeParse({
    parsedQuery: query,
    parsedCurrentPage: currentPage,
  });
  if (!parsedData.success) {
    throw new Error("Tipe query tidak valid.");
  }
  const { parsedQuery, parsedCurrentPage } = parsedData.data;

  // Calculate the number of records to skip based on the current page
  const offset = (parsedCurrentPage - 1) * ITEMS_PER_PAGE;
  try {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        age: true,
        city: true,
        state: true,
        adoptionStatus: { select: { name: true } },
        species: { select: { name: true } },
        petImages: { select: { url: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    // add a 4 seconds delay to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    // return the pets
    return pets;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching pets.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data hewan.");
  }
}

export async function fetchAdoptionStatusList() {
  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  try {
    // Fetch the adoption status list. ["Available", "Adopted", "Pending"]
    const adoptionStatusList = await prisma.adoptionStatus.findMany();

    // return the adoption status list
    return adoptionStatusList;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching adoption status.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil status adopsi.");
  }
}

export async function fetchPetById(id) {
  // Disable caching
  noStore();

  // Check if the user has permission
  const hasPermission = await rolesWithPermission(["admin", "employee"]);
  if (!hasPermission) {
    throw new Error("Akses ditolak.");
  }

  // Validate the id at runtime
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    throw new Error("Tipe tidak valid.");
  }
  const validatedId = parsedId.data;

  // Get the pet by id
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: validatedId },
      include: { petImages: true },
    });

    // return the pet
    return pet;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching pets.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data hewan.");
  }
}

// Tidak ada anotasi tipe, interface, atau type alias pada bagian ini.
// File sudah valid untuk .js dengan JSX.
// Anda bisa langsung mengganti ekstensi file menjadi .js tanpa perubahan kode.
