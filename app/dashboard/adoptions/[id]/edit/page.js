import Form from '@/app/ui/dashboard/adoptions/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/adoptions/breadcrumbs';
import { fetchContactMessageById } from '@/app/lib/data/contact/messages'; // DIUBAH: Path import diperbaiki
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata = {
  title: 'Ubah Status Pesan',
};

export default async function Page({ params }) {
    const id = params.id;
    // DIUBAH: Memanggil fungsi dengan nama yang benar
    const message = await fetchContactMessageById(id);

    if (!message) {
        notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pesan Adopsi', href: '/dashboard/adoptions' },
          {
            label: 'Ubah Status',
            href: `/dashboard/adoptions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form message={message} />
    </main>
  );
}
