import { fetchFilteredContactMessages } from '@/app/lib/data/contact/messages'; // DIUBAH: Path import diperbaiki
import { UpdateMessageStatus, DeleteMessage } from '@/app/ui/dashboard/adoptions/buttons';

const formatDateToLocal = (dateStr, locale = 'id-ID') => {
  const date = new Date(dateStr);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Sudah dihubungi': return 'bg-green-100 text-green-800';
        case 'Selesai': return 'bg-blue-100 text-blue-800';
        default: return 'bg-yellow-100 text-yellow-800';
    }
};

export default async function MessagesTable({ query, currentPage }) {
  // DIUBAH: Memanggil fungsi dengan nama yang benar
  const messages = await fetchFilteredContactMessages(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Tampilan Mobile */}
          <div className="md:hidden">
            {messages?.map((msg) => (
              <div key={msg.id} className="mb-2 w-full rounded-md bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between border-b pb-4">
                  <div>
                    <p className="font-semibold text-gray-800">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-600">{msg.email}</a>
                    {msg.phone && <p className="text-sm text-gray-500">{msg.phone}</p>}
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(msg.status)}`}>
                    {msg.status}
                  </span>
                </div>
                <div className="py-4 text-sm text-gray-700">
                  <p>{msg.message}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-xs text-gray-500">{formatDateToLocal(msg.createdAt)}</p>
                    <div className="flex justify-end gap-2">
                        <UpdateMessageStatus id={msg.id} />
                        <DeleteMessage id={msg.id} />
                    </div>
                </div>
              </div>
            ))}
          </div>
          {/* Tampilan Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Pengirim</th>
                <th scope="col" className="px-3 py-5 font-medium">Pesan</th>
                <th scope="col" className="px-3 py-5 font-medium">Tanggal</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="relative py-3 pl-6 pr-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {messages?.map((msg) => (
                <tr key={msg.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p className="font-semibold">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-600">{msg.email}</a>
                     {msg.phone && <p className="text-xs text-gray-500">{msg.phone}</p>}
                  </td>
                  <td className="px-3 py-3 max-w-sm"><p className="whitespace-pre-wrap">{msg.message}</p></td>
                  <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(msg.createdAt)}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(msg.status)}`}>{msg.status}</span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMessageStatus id={msg.id} />
                      <DeleteMessage id={msg.id} />
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
