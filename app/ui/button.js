import clsx from 'clsx';

// Ini adalah satu-satunya komponen yang seharusnya ada di file ini.
// Perhatikan ini adalah ekspor bernama (named export).
export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-darkBrown px-4 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkBrown active:bg-opacity-80 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}