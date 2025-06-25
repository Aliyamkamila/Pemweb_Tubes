import { fetchContactMessagesPages, fetchFilteredContactMessages } from '@/app/lib/data/contact/messages';
import Search from '@/app/ui/search';
import { CreateAdoption } from '@/app/ui/dashboard/adoptions/buttons';
import { Suspense } from 'react';
import Table from '@/app/ui/dashboard/adoptions/table';
import Pagination from '@/app/ui/dashboard/pets/pagination';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata = {
  title: 'Pesan Adopsi',
};

export default async function Page({
  searchParams,
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchContactMessagesPages(query);
  let messages = await fetchFilteredContactMessages(query, currentPage); 

  // --- START DEBUGGING ADDITION ---
  try {
    // This will force serialization and throw a clearer error if any non-serializable value exists
    messages = JSON.parse(JSON.stringify(messages));
  } catch (e) {
    console.error("Serialization Error: Failed to serialize messages for client component.", e);
    // Re-throw a more specific error to help identify the problem
    throw new Error("Failed to prepare messages for display: " + e.message);
  }
  // --- END DEBUGGING ADDITION ---

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pesan Adopsi</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari pesan adopsi..." />
      </div>
      <Suspense key={query + currentPage} fallback={<p>Loading messages...</p>}>
        <Table messages={messages} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}