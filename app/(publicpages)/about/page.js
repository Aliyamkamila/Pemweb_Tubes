import Image from "next/image";
import aboutUsImage from "@/public/homeimage15.webp"; // Menggunakan gambar yang sudah ada

export default function Page() {
  return (
    <div className="bg-darkBrown text-beige rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 sm:h-64 w-full">
        <Image
          src={aboutUsImage}
          alt="Kelompok hewan peliharaan"
          fill
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-center text-white drop-shadow-lg">
            Tentang Cozy House
          </h1>
        </div>
      </div>

      <div className="p-8 sm:p-12 space-y-8 font-sans">
        <div>
          <h2 className="text-2xl font-bold font-serif text-warmPeach">
            Misi Kami
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-beige/90">
            Selamat datang di Cozy House, tempat di mana kasih sayang bertemu
            dengan tujuan mulia. Misi kami sederhana namun bermakna:
            menyediakan tempat yang aman bagi hewan yang membutuhkan,
            memberikan perlindungan, perawatan, dan kesempatan kedua untuk
            mendapatkan rumah penuh cinta.
          </p>
        </div>

        <div className="border-t border-beige/20 my-8"></div>

        <div>
          <h2 className="text-2xl font-bold font-serif text-warmPeach">
            Dedikasi Kami
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-beige/90">
            Dengan dedikasi yang tertanam dalam setiap aspek operasional kami,
            kami berupaya tidak hanya menyelamatkan dan merehabilitasi hewan,
            tetapi juga mengedukasi dan mengadvokasi kesejahteraan mereka.
            Setiap goyangan ekor, setiap dengkuran puas, menjadi bahan bakar
            komitmen kami untuk membuat perubahan nyata bagi mereka yang tidak
            bisa bersuara.
          </p>
        </div>

        <div className="border-t border-beige/20 my-8"></div>

        <div>
          <h2 className="text-2xl font-bold font-serif text-warmPeach">
            Komunitas Kami
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-beige/90">
            Bersama staf, relawan, dan para pendukung kami, kami membangun
            komunitas di mana setiap hewan dihargai dan dicintai. Bergabunglah
            bersama kami dalam perjalanan menciptakan dunia di mana setiap
            jejak kaki meninggalkan jejak harapan.
          </p>
        </div>
      </div>
    </div>
  );
}