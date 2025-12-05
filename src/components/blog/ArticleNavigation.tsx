import Link from 'next/link';

import type { Blog } from '@/lib/microcms/types';

type ArticleNavigationProps = {
  prev: Pick<Blog, 'title' | 'slug'> | null;
  next: Pick<Blog, 'title' | 'slug'> | null;
};

export function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-12 border-t border-gray-200 pt-8 dark:border-slate-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 sm:max-w-[48%]"
          >
            <span className="mb-1 text-xs text-gray-500 dark:text-slate-400">← 前の記事</span>
            <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col rounded-lg border border-gray-200 p-4 text-right transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 sm:max-w-[48%] sm:ml-auto"
          >
            <span className="mb-1 text-xs text-gray-500 dark:text-slate-400">次の記事 →</span>
            <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
