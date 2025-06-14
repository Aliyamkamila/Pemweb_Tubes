// app/ui/dashboard/adoptions/breadcrumbs.js
"use client";

import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="list-none p-0 inline-flex space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            <Link href={item.href}>
              <span className="hover:underline text-blue-600">{item.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}



















