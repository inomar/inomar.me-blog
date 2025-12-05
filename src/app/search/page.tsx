import { Metadata } from 'next';
import { Suspense } from 'react';

import { ArticleList } from '@/components/blog/ArticleList';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { SearchInput } from '@/components/ui/SearchInput';
import { Skeleton } from '@/components/ui/Skeleton';
import { SITE_URL } from '@/lib/constants';
import { searchBlogs } from '@/lib/microcms/api';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `「${q}」の検索結果` : '記事を検索';

  return {
    title,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/search`,
    },
  };
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <p className="text-center text-gray-500 dark:text-slate-400">
        検索キーワードを入力してください
      </p>
    );
  }

  const { contents: articles, totalCount } = await searchBlogs(query);

  if (articles.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-2 text-gray-500 dark:text-slate-400">
          「{query}」に一致する記事が見つかりませんでした
        </p>
        <p className="text-sm text-gray-400 dark:text-slate-500">
          別のキーワードで検索してみてください
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-gray-600 dark:text-slate-400">
        「{query}」の検索結果: {totalCount}件
      </p>
      <ArticleList articles={articles} />
    </>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-48" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={[{ label: '検索', href: '/search' }]} />

      <header className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-slate-100">記事を検索</h1>
        <div className="max-w-md">
          <SearchInput defaultValue={q} />
        </div>
      </header>

      <section>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={q} />
        </Suspense>
      </section>
    </div>
  );
}
