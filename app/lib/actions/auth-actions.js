// Lokasi: app/lib/actions/auth-actions.js

'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState, formData) {
  try {
    // Tambahkan opsi redirectTo di sini
    await signIn("credentials", { ...Object.fromEntries(formData), redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau Password salah.";
        default:
          return "Terjadi kesalahan.";
      }
    }
    throw error;
  }
}

// TAMBAHKAN FUNGSI BARU INI
export async function signOutAction() {
  await nextAuthSignOut();
}