const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Menghapus data lama...");
    // Urutan penghapusan penting untuk menghindari error relasi
    await prisma.petImage.deleteMany();
    await prisma.adoption.deleteMany();
    await prisma.like.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.adoptionStatus.deleteMany();
    await prisma.species.deleteMany();
    await prisma.contactMessage.deleteMany();
    console.log("Data lama berhasil dihapus.");

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
    await prisma.user.createMany({ data: usersData });
    console.log("Data pengguna berhasil ditambahkan.");

    // --- Seeding Species ---
    console.log("Menambahkan data spesies...");
    const species = [
      { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2", name: "Anjing" },
      { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886", name: "Kucing" },
      { id: "5c9b8ec8-21d1-4da2-9135-58b9f198f1f3", name: "Reptil" },
      { id: "a4b1c2d3-e4f5-4a6b-8c7d-8e9f0a1b2c3d", name: "Burung" },
    ];
    await prisma.species.createMany({ data: species });
    console.log("Data spesies berhasil ditambahkan.");

    // --- Seeding Adoption Status ---
    console.log("Menambahkan data status adopsi...");
    const adoptionStatuses = [
      { id: "640566d8-2619-4764-8660-61a39baf075e", name: "Available" },
      { id: "2609d1ce-f62b-42e3-a649-0129ace0152b", name: "Adopted" },
      { id: "09fe1188-741e-4a97-a9ad-0cfd094ee247", name: "Pending" },
    ];
    await prisma.adoptionStatus.createMany({ data: adoptionStatuses });
    console.log("Data status adopsi berhasil ditambahkan.");

    // --- Seeding Pets (Berlokasi di Jawa Barat) ---
    console.log("Menambahkan data hewan...");
    const petData = [
      {
        name: "Rocky", age: 2, gender: "Male", breed: "Golden Retriever", weight: 15.5, height: 55, city: "Bandung", state: "Jawa Barat", description: "Sangat ramah, pintar, dan suka bermain bola.", published: true,
        species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/dog1.jpg" }, {url: "/uploads/dog1-2.jpg"}] },
      },
      {
        name: "Luna", age: 3, gender: "Female", breed: "Poodle", weight: 8.0, height: 30, city: "Bogor", state: "Jawa Barat", description: "Sangat playful dan cocok untuk keluarga.", published: true,
        species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
        adoptionStatus: { connect: { id: "09fe1188-741e-4a97-a9ad-0cfd094ee247" } }, // Pending
        petImages: { create: [{ url: "/uploads/dog2.jpg" }] },
      },
      {
        name: "Oyen", age: 1, gender: "Male", breed: "Domestik", weight: 4.2, height: 25, city: "Cimahi", state: "Jawa Barat", description: "Kucing pemberani yang suka berpetualang.", published: true,
        species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/cat1.webp" }, { url: "/uploads/cat1-1.jpg" }] },
      },
      {
        name: "Milo", age: 1, gender: "Male", breed: "Persia", weight: 3.5, height: 20, city: "Depok", state: "Jawa Barat", description: "Kucing manja yang suka tidur.", published: true,
        species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
        adoptionStatus: { connect: { id: "2609d1ce-f62b-42e3-a649-0129ace0152b" } }, // Adopted
        petImages: { create: [{ url: "/uploads/cat2.webp" }, { url: "/uploads/cat2-2.jpg" }] },
      },
      {
        name: "Bintik", age: 0.5, gender: "Male", breed: "Leopard Gecko", weight: 0.1, height: 15, city: "Bandung", state: "Jawa Barat", description: "Gecko yang tenang dan mudah dirawat.", published: true,
        species: { connect: { id: "5c9b8ec8-21d1-4da2-9135-58b9f198f1f3" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/reptile1.jpeg" }, { url: "/uploads/reptile1-1.webp" }] },
      },
      {
        name: "Zila", age: 3, gender: "Female", breed: "Ular Jagung", weight: 1.5, height: 23, city: "Bekasi", state: "Jawa Barat", description: "Tidak berbisa dan cocok untuk pemula.", published: true,
        species: { connect: { id: "5c9b8ec8-21d1-4da2-9135-58b9f198f1f3" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/reptile2.webp" }, { url: "/uploads/reptile2-2.jpg" }] },
      },
      {
        name: "Rio", age: 1, gender: "Male", breed: "Macaow", weight: 0.03, height: 10, city: "Karawang", state: "Jawa Barat", description: "Burung dengan suara merdu.", published: true,
        species: { connect: { id: "a4b1c2d3-e4f5-4a6b-8c7d-8e9f0a1b2c3d" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/bird1.webp" }, { url: "/uploads/bird1-1.webp" }] },
      },
      {
        name: "Tweety", age: 2, gender: "Female", breed: "Kenari", weight: 0.02, height: 8, city: "Bogor", state: "Jawa Barat", description: "Kecil, lincah, dan berwarna kuning cerah.", published: true,
        species: { connect: { id: "a4b1c2d3-e4f5-4a6b-8c7d-8e9f0a1b2c3d" } },
        adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } }, // Available
        petImages: { create: [{ url: "/uploads/bird2.webp" }, { url: "/uploads/bird2-2.webp" }] },
      },
    ];

    for (const p of petData) {
      await prisma.pet.create({ data: p });
    }
    console.log("Data hewan berhasil ditambahkan.");

  } catch (error) {
    console.error("Terjadi kesalahan saat seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();