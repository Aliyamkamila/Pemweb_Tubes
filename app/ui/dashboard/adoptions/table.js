// File: app/ui/dashboard/adoptions/table.js
import { fetchFilteredContactMessages } from "@/app/lib/data/contact/messages";
import { UpdateStatus, DeleteMessage, EditMessage } from "./buttons"; 

export default async function AdoptionsTable({ query, currentPage }) {
  const messages = await fetchFilteredContactMessages(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white p-4 shadow-sm md:pt-0">
          <table className="min-w-full text-darkBrown">
            <thead className="rounded-lg text-left text-sm font-semibold">
              <tr>
                <th scope="col" className="px-4 py-5 sm:pl-6">Nama</th>
                <th scope="col" className="px-3 py-5">Email</th>
                <th scope="col" className="px-3 py-5">No. Telepon</th>
                <th scope="col" className="px-3 py-5">Pesan</th>
                <th scope="col" className="px-3 py-5">Status</th>
                <th scope="col" className="relative py-3 pl-6 pr-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {messages?.map((message) => (
                <tr key={message.id} className="w-full border-b py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">{message.name}</td>
                  <td className="whitespace-nowrap px-3 py-3">{message.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{message.phone || '-'}</td>
                  <td className="max-w-xs truncate whitespace-nowrap px-3 py-3">{message.message}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <UpdateStatus message={message} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        {/* Tombol Edit sekarang ditambahkan di sini */}
                        <EditMessage id={message.id} />
                        <DeleteMessage id={message.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}