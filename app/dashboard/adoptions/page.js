import Pagination from '@/app/ui/dashboard/pets/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dashboard/adoptions/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchContactMessagesPages } from '@/app/lib/data/contact/messages';
import { Metadata } from 'next';

export const metadata = {
  title: 'Pesan Adopsi',
};

export default async function Page({ searchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchContactMessagesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* DIUBAH: Menghapus font lusitana dan menyamakan style */}
        <h1 className="font-serif text-3xl font-bold text-darkBrown">
          Pesan Adopsi
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari pesan..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}