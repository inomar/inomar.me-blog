import Link from 'next/link';

type TagProps = {
  name: string;
  slug: string;
  size?: 'sm' | 'md';
};

export function Tag({ name, slug, size = 'md' }: TagProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <Link
      href={`/tag/${slug}`}
      className={`inline-block rounded-full bg-gray-100 font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 ${sizeClasses[size]}`}
    >
      {name}
    </Link>
  );
}
