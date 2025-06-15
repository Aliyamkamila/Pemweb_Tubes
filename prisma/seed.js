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
    { id: "ID_REPTIL_BARU", name: "Reptil" }, // Tambahkan ini
    { id: "ID_BURUNG_BARU", name: "Burung" }, // Tambahkan ini
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
    {
      name: "Luna",
      age: 3,
      gender: "Betina",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Poodle",
      weight: 8.0,
      height: 30,
      city: "Jakarta",
      state: "DKI Jakarta",
      description: "Sangat playful dan cocok untuk keluarga dengan anak-anak.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog2.jpg" }] },
    },
    {
      name: "Milo",
      age: 0.8,
      gender: "Jantan",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Persia",
      weight: 3.5,
      height: 20,
      city: "Surabaya",
      state: "Jawa Timur",
      description: "Kucing manja yang suka tidur dan mencari perhatian.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat2.webp" }] },
    },
    {
    name: "Bintik",
    age: 0.5,
    gender: "Jantan",
    species: { connect: { id: "ID_UNIK_REPTIL" } }, // Hubungkan ke ID reptil yang baru
    breed: "Leopard Gecko",
    weight: 0.1,
    height: 15,
    city: "Bandung",
    state: "Jawa Barat",
    description: "Gecko yang tenang dan mudah dirawat.",
    published: true,
    adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
    petImages: { create: [{ url: "/uploads/gecko1.jpg" }] }, // Pastikan ada gambar yang sesuai
  },
  {
    name: "Kenari",
    age: 1,
    gender: "Betina",
    species: { connect: { id: "ID_UNIK_BURUNG" } }, // Hubungkan ke ID burung yang baru
    breed: "Kenari",
    weight: 0.03,
    height: 10,
    city: "Jakarta",
    state: "DKI Jakarta",
    description: "Burung dengan suara merdu, sangat cocok untuk teman di rumah.",
    published: true,
    adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
    petImages: { create: [{ url: "/uploads/kenari1.jpg" }] }, // Pastikan ada gambar yang sesuai
  },
    {
      name: "Max",
      age: 4,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "German Shepherd",
      weight: 30.0,
      height: 60,
      city: "Medan",
      state: "Sumatera Utara",
      description: "Anjing penjaga yang setia dan protektif.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog4.jpg" }] },
    },
    {
      name: "Lily",
      age: 1.5,
      gender: "Betina",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Siam",
      weight: 3.0,
      height: 22,
      city: "Palembang",
      state: "Sumatera Selatan",
      description: "Kucing siam yang cerdas dan suka bersuara.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat4.webp" }] },
    },
    {
      name: "Toby",
      age: 0.7,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Pug",
      weight: 7.0,
      height: 28,
      city: "Semarang",
      state: "Jawa Tengah",
      description: "Anjing kecil yang lucu dan suka bercanda.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog5.jpg" }] },
    },
    {
      name: "Cleo",
      age: 2.5,
      gender: "Betina",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Maine Coon",
      weight: 6.0,
      height: 30,
      city: "Makassar",
      state: "Sulawesi Selatan",
      description: "Kucing besar berbulu panjang yang tenang.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat5.webp" }] },
    },
    {
      name: "Charlie",
      age: 5,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Labrador Retriever",
      weight: 28.0,
      height: 58,
      city: "Padang",
      state: "Sumatera Barat",
      description: "Anjing keluarga yang sangat sabar dan penyayang.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog6.jpg" }] },
    },
    {
      name: "Zoe",
      age: 1,
      gender: "Betina",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Scottish Fold",
      weight: 4.0,
      height: 24,
      city: "Pontianak",
      state: "Kalimantan Barat",
      description: "Kucing dengan telinga melipat, sangat imut.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat6.webp" }] },
    },
    {
      name: "Duke",
      age: 2,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Bulldog",
      weight: 25.0,
      height: 35,
      city: "Solo",
      state: "Jawa Tengah",
      description: "Anjing bulldog yang santai dan sedikit malas.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog7.jpg" }] },
    },
    {
      name: "Nala",
      age: 3,
      gender: "Betina",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Ragdoll",
      weight: 5.0,
      height: 28,
      city: "Manado",
      state: "Sulawesi Utara",
      description: "Kucing ragdoll yang lembut dan suka dipeluk.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat7.webp" }] },
    },
    {
      name: "Cooper",
      age: 1.8,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Border Collie",
      weight: 20.0,
      height: 50,
      city: "Samarinda",
      state: "Kalimantan Timur",
      description: "Anjing cerdas dan energik, butuh banyak aktivitas.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog8.jpg" }] },
    },
    {
      name: "Simba",
      age: 0.6,
      gender: "Jantan",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Bengal",
      weight: 3.0,
      height: 20,
      city: "Banjarmasin",
      state: "Kalimantan Selatan",
      description: "Anak kucing bengal dengan motif eksotis, sangat aktif.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat8.webp" }] },
    },
    {
      name: "Daisy",
      age: 4,
      gender: "Betina",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Shih Tzu",
      weight: 6.5,
      height: 25,
      city: "Balikpapan",
      state: "Kalimantan Timur",
      description: "Anjing kecil yang manis dan suka bersosialisasi.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog9.jpg" }] },
    },
    {
      name: "Jasper",
      age: 1.2,
      gender: "Jantan",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "British Shorthair",
      weight: 5.5,
      height: 26,
      city: "Tangerang",
      state: "Banten",
      description: "Kucing British Shorthair yang kalem dan mandiri.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat9.webp" }] },
    },
    {
      name: "Oscar",
      age: 2.3,
      gender: "Jantan",
      species: { connect: { id: "134aadd0-2436-4f5c-bdd6-c7245cf3e3a2" } },
      breed: "Siberian Husky",
      weight: 23.0,
      height: 57,
      city: "Bekasi",
      state: "Jawa Barat",
      description: "Anjing husky yang energik dan suka berlari.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/dog10.jpg" }] },
    },
    {
      name: "Whiskers",
      age: 0.9,
      gender: "Betina",
      species: { connect: { id: "16fbe716-4b15-4fec-8f11-2a6ab543e886" } },
      breed: "Sphynx",
      weight: 2.8,
      height: 20,
      city: "Depok",
      state: "Jawa Barat",
      description: "Kucing sphynx yang unik, sangat suka kehangatan.",
      published: true,
      adoptionStatus: { connect: { id: "640566d8-2619-4764-8660-61a39baf075e" } },
      petImages: { create: [{ url: "/uploads/cat10.webp" }] },
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