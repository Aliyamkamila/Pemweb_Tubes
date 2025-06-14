import Link from 'next/link';
import { clsx } from 'clsx';

// Komponen Breadcrumbs untuk navigasi
// Prop diubah dari 'items' menjadi 'breadcrumbs' untuk konsistensi
export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx('flex text-gray-600')}>
        {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900 font-semibold' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-2 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
