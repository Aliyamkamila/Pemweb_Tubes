import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { z } from "zod";
// import { auth } from "@/auth"; // Sudah tidak diperlukan di file ini
import { idSchema } from "../../schemas/common";

const fetchPublishedPetsPagesWithCategorySchema = z.object({
  parsedQuery: z.string(),
  parsedSpeciesName: z.string().optional(),
});

const fetchFilteredPublishedPetsWithCategorySchema = z.object({
  parsedQuery: z.string(),
  parsedCurrentPage: z.number(),
  parsedSpeciesName: z.string().optional(),
});

export async function fetchFilteredPublishedPetsWithCategory(
  query,
  currentPage,
  speciesName,
) {
  const parsedData = fetchFilteredPublishedPetsWithCategorySchema.safeParse({
    parsedQuery: query,
    parsedCurrentPage: currentPage,
    parsedSpeciesName: speciesName,
  });

  if (!parsedData.success) {
    throw new Error("Tipe tidak valid.");
  }

  const { parsedQuery, parsedCurrentPage, parsedSpeciesName } = parsedData.data;
  const offset = (parsedCurrentPage - 1) * ITEMS_PER_PAGE;

  // const session = await auth(); // Dihapus
  // const userId = session?.user?.id; // Dihapus

  try {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: parsedQuery,
          mode: "insensitive",
        },
        published: true,
        ...(parsedSpeciesName && {
          species: {
            name: parsedSpeciesName,
          },
        }),
      },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        petImages: {
          select: {
            url: true,
          },
          take: 1,
        },
        // Bagian 'likes' sudah sepenuhnya dihapus dari sini
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return pets;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching pets.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data hewan.");
  }
}

export async function fetchPublishedPetsPagesWithCategory(
  query,
  speciesName,
) {
  const parsedData = fetchPublishedPetsPagesWithCategorySchema.safeParse({
    parsedQuery: query,
    parsedSpeciesName: speciesName,
  });
  if (!parsedData.success) {
    throw new Error("Tipe tidak valid.");
  }
  const { parsedQuery, parsedSpeciesName } = parsedData.data;

  try {
    const count = await prisma.pet.count({
      where: {
        name: {
          contains: parsedQuery,
          mode: "insensitive",
        },
        published: true,
        ...(parsedSpeciesName && {
          species: {
            name: parsedSpeciesName,
          },
        }),
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching pets pages.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil halaman hewan.");
  }
}

export async function fetchSpecies() {
  try {
    const species = await prisma.species.findMany();
    return species;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching species.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil spesies.");
  }
}

export async function fetchFrontPagePetById(id) {
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    throw new Error("ID tidak valid.");
  }
  const validatedId = parsedId.data;

  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: validatedId,
      },
      select: {
        name: true,
        city: true,
        state: true,
        age: true,
        weight: true,
        height: true,
        species: {
          select: {
            name: true,
          },
        },
        description: true,
        petImages: true,
      },
    });
    return pet;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching pet.", error);
    }
    throw new Error("Terjadi kesalahan saat mengambil data hewan.");
  }
}