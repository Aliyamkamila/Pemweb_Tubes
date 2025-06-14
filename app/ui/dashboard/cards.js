import {
  QueueListIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { opensans } from "@/app/ui/fonts"; // PASTIKAN BARIS INI ADA
import { fetchPetCardData } from "@/app/lib/data/pets/pet";

const iconMap = {
  'Total Hewan': QueueListIcon,
  'Diadopsi': CheckCircleIcon,
  'Menunggu': ClockIcon,
  'Tersedia': SparklesIcon,
};

export function Card({ title, value }) {
  const Icon = iconMap[title] || null;

  return (
    <div className="rounded-xl bg-white/60 p-4 shadow-sm border border-black/5 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-darkBrown/10">
          {Icon && <Icon className="h-6 w-6 text-darkBrown" />}
        </div>
        <div>
          <h3 className="text-sm font-medium tracking-wide text-darkBrown/80">
            {title}
          </h3>
          <p className={`${opensans.className} text-2xl font-bold text-darkBrown`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function CardWrapper() {
  const { totalPets, adoptedPetsCount, pendingPetsCount, availablePetsCount } =
    await fetchPetCardData();

  return (
    <>
      <Card title="Total Hewan" value={totalPets} />
      <Card title="Diadopsi" value={adoptedPetsCount} />
      <Card title="Menunggu" value={pendingPetsCount} />
      <Card title="Tersedia" value={availablePetsCount} />
    </>
  );
}