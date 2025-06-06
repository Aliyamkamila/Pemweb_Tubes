import Footer from "../ui/footer";
import TopNavWrapper from "../ui/top-nav-wrapper";

export default async function PagesLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-beige text-darkBrown font-sans">
      <TopNavWrapper />
      <main className="flex-grow mx-auto w-full max-w-[76rem] px-4 pt-6 pb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
