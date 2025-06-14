import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function SideNav() {
  const session = await auth();
  const userRole = session?.user?.role;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-darkBrown p-4 lg:h-40"
        href="/dashboard"
      >
        <div className="w-32 text-white md:w-40">
          <div className="flex flex-row items-center leading-none text-white">
            <LifebuoyIcon className="h-12 w-12 rotate-[15deg]" />
            <p className="ml-2 text-[24px]">PetAdopt</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
        <NavLinks userRole={userRole} />
        <div className="hidden h-auto w-full grow rounded-md lg:block"></div>
        <form
          action={async () => {
            "use server";
            // PERUBAHAN DI SINI: Arahkan ke halaman utama ("/")
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md border border-transparent p-3 text-sm font-medium hover:border-slate-400 lg:flex-none lg:justify-start lg:p-2 lg:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}