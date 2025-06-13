const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Menghapus data lama...");
  // Urutan penghapusan penting untuk menghindari error relasi
  await prisma.petImage.deleteMany().catch(() => {});
  await prisma.adoption.deleteMany().catch(() => {});
  await prisma.like.deleteMany().catch(() => {});
  await prisma.pet.deleteMany().catch(() => {});
  await prisma.account.deleteMany().catch(() => {});
  await prisma.session.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});
  await prisma.adoptionStatus.deleteMany().catch(() => {});
  await prisma.species.deleteMany().catch(() => {});
  await prisma.contactMessage.deleteMany().catch(() => {});

  // --- Seeding Users ---
  console.log("Menambahkan data pengguna...");
  const usersData = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      name: "Employee User",
      email: "employee@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "employee",
    },
  ];
  for (const u of usersData) {
    await prisma.user.create({ data: u });
  }
  console.log("Data pengguna berhasil ditambahkan.");

  // --- Seeding Species ---
  console.log("Menambahkan data spesies...");
  const species = [
    { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2", name: "Anjing" },
    { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886", name: "Kucing" },
  ];
  for (const s of species) {
    await prisma.species.create({ data: s });
  }
  console.log("Data spesies berhasil ditambahkan.");

  // --- Seeding Adoption Status ---
  console.log("Menambahkan data status adopsi...");
  const adoptionStatuses = [
    { id: "640566d8-2619-4764-8660-61a39baf075e", name: "Available" },
    { id: "2609d1ce-f62b-42e3-a649-0129ace0152b", name: "Adopted" },
  ];
  for (const as of adoptionStatuses) {
    await prisma.adoptionStatus.create({ data: as });
  }
  console.log("Data status adopsi berhasil ditambahkan.");

  // --- Seeding Pets ---
  console.log("Menambahkan data hewan...");
  const petData = [
    {
      name: "Rocky",
      age: 2,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Golden Retriever",
      weight: 15.5,
      height: 55,
      city: "Bandung",
      state: "Jawa Barat",
      description: "Sangat ramah, pintar, dan suka bermain bola.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog1.jpg" }] },
    },
    {
      name: "Oyen",
      age: 1,
      gender: "Jantan",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Domestik",
      weight: 4.2,
      height: 25,
      city: "Cimahi",
      state: "Jawa Barat",
      description: "Kucing pemberani yang suka berpetualang dan kadang galak.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat1.webp" }] },
    },
  ];
  for (const p of petData) {
    await prisma.pet.create({ data: p });
  }
  console.log("Data hewan berhasil ditambahkan.");

  console.log("Seeding selesai.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Terjadi kesalahan saat seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });