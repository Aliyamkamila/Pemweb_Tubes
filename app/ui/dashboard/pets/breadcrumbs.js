import { clsx } from "clsx";
import Link from "next/link";
import { opensans } from "@/app/ui/fonts";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol
        className={clsx(
          opensans.className,
          "flex flex-wrap text-sm sm:text-base font-medium text-darkBrown"
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={clsx(
              "flex items-center",
              breadcrumb.active ? "text-warmPeach" : "text-beige"
            )}
          >
            <Link href={breadcrumb.href} className="hover:underline">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-beige">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
