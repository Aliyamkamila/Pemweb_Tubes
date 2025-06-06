import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";

// Layout utama untuk dashboard admin dan employee (sudah Anda ubah)
const AdminDashboard = ({ children }) => {
  return (
    <div className="flex h-screen flex-col lg:flex-row bg-beige text-darkBrown font-sans">
      <aside className="w-full lg:w-64 flex-none bg-darkBrown text-beige">
        <SideNav />
      </aside>
      <main className="flex-grow overflow-y-auto p-6 lg:p-10 bg-beige">
        {children}
      </main>
    </div>
  );
};

// Komponen Akses Ditolak (sudah Anda ubah dan terjemahkan)
const AccessDenied = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-beige text-darkBrown">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
        <p className="text-sm text-darkBrown/80"> {/* Diubah dari text-gray-600 agar lebih serasi */}
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
};

// Fungsi Layout utama yang memeriksa peran pengguna
export default async function Layout({ children }) {
  const session = await auth();
  const userRole = session?.user?.role;

  // Logika untuk menampilkan dashboard atau halaman "Akses Ditolak"
  if (userRole === "employee" || userRole === "admin") {
    return <AdminDashboard>{children}</AdminDashboard>;
  } else {
    return <AccessDenied />;
  }
}