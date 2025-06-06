import Link from "next/link";
import Image from "next/image";
import welcomePicture from "@/public/homeimage15.webp";

const categories = ["Dog", "Cat", "Bird", "Reptile"];

export default function Page() {
  return (
    <>
      <WelcomeSection />
      {/* Categories */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-serif text-warmPeach mb-4">
          Kategori Hewan
        </h2>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`pets?page=1&category=${category}`}
              className="bg-beige text-darkBrown hover:bg-warmPeach font-medium rounded-xl shadow px-6 py-3 transition-all duration-200"
            >
              {category}
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
          Not only people <br /> need a house
        </h1>
        <p className="mb-6 text-sm sm:text-base max-w-md font-sans">
          We offer to give a chance to a little and nice puppy with an extremely
          wide and open heart. He or she will love you more than anybody else in
          the world, you will see!
        </p>
        <Link
          href="/pets"
          className="inline-block bg-warmPeach text-darkBrown font-semibold py-2 px-6 rounded-full shadow hover:bg-opacity-90 transition"
        >
          Make a friend
        </Link>
      </div>
      <div className="relative flex-1 h-full w-full">
        <Image
          src={welcomePicture}
          alt="Welcome Pet"
          fill
          className="object-cover object-center"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
