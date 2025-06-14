// aliyamkamila/pemweb_tubes/Pemweb_Tubes-a2e10cf42ea7ba8dce55549106b3fea6e0bae43a/app/login/page.js

import LoginForm from "@/app/ui/login-form";
import { GoogleSignInButton } from "../ui/auth-buttons"; // <-- Import ini akan dihapus
import { PetMeLogo } from "../ui/logo";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <PetMeLogo />
          </div>
        </div>
        <LoginForm />
        {/* HAPUS BAGIAN DI BAWAH INI */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignInButton />
        {/* SAMPAI DI SINI */}
      </div>
    </main>
  );
}