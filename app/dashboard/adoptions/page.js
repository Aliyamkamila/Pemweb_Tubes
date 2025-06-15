import Pagination from '@/app/ui/dashboard/pets/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dashboard/adoptions/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchContactMessagesPages } from '@/app/lib/data/contact/messages'; // DIUBAH: Path import diperbaiki
import { Metadata } from 'next';

export const metadata = {
  title: 'Pesan Adopsi',
};

export default async function Page({ searchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // DIUBAH: Memanggil fungsi dengan nama yang benar
  const totalPages = await fetchContactMessagesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pesan Adopsi</h1>
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
