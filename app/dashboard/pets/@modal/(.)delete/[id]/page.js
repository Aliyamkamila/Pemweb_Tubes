"use client";
import { useRouter } from "next/navigation";
import { deletePet } from "@/app/lib/actions/pet";

export default function DeletePetModal({ params }) {
    const router = useRouter();
    const { id } = params; // langsung ambil dari props

    const handleDelete = async () => {
        await deletePet(id);
        router.back();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-md">
                <h2 className="font-medium mb-2">Konfirmasi Penghapusan Hewan</h2>
                <p>Apakah Anda yakin ingin menghapus hewan ini?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-md"
                        onClick={() => router.back()}
                    >
                        Batal
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                        onClick={handleDelete}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
