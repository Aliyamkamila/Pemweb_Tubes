import Link from "next/link";
import Image from "next/image";
import welcomePicture from "@/public/homeimage15.webp";

const categories = [
  { name: "Anjing", value: "Dog" },
  { name: "Kucing", value: "Cat" },
  { name: "Burung", value: "Bird" },
  { name: "Reptil", value: "Reptile" },
];

export default function Page() {
  return (
    <>
      <WelcomeSection />
      {/* Categories */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-serif text-darkBrown mb-4">
          Kategori Hewan
        </h2>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`pets?page=1&category=${category.value}`}
              className="bg-darkBrown text-beige hover:bg-warmPeach hover:text-darkBrown font-medium rounded-xl shadow px-6 py-3 transition-all duration-200"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function WelcomeSection() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-darkBrown rounded-xl overflow-hidden h-[28rem] mt-6 shadow-lg">
      <div className="flex flex-col justify-center flex-1 p-8 text-beige font-serif">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Bukan hanya manusia <br /> yang butuh rumah
        </h1>
        <p className="mb-6 text-sm sm:text-base max-w-md font-sans">
          Kami menawarkan kesempatan untuk seekor hewan kecil yang baik dengan
          hati yang sangat tulus dan terbuka. Dia akan menyayangi Anda lebih dari
          siapa pun di dunia, Anda akan lihat!
        </p>
        <Link
          href="/pets"
          // --- PERUBAHAN DI SINI ---
          className="inline-block bg-beige text-darkBrown font-semibold py-2 px-6 rounded-full shadow hover:bg-opacity-80 transition"
        >
          Cari Sahabat
        </Link>
      </div>
      <div className="relative flex-1 h-full w-full">
        <Image
          src={welcomePicture}
          alt="Hewan Sambutan"
          fill
          className="object-cover object-center"
          placeholder="blur"
        />
      </div>
    </div>
  );
}