import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/blog/ArticleList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Pagination } from '@/components/ui/Pagination';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { getBlogs } from '@/lib/microcms/api';

const POSTS_PER_PAGE = 10;

type Props = {
  params: Promise<{ page: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { totalCount } = await getBlogs({ limit: 1 });
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function PaginatedHomePage({ params }: Props) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const { contents: articles, totalCount } = await getBlogs({
    offset,
    limit: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <>
      <JsonLd type="WebSite" />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <section className="mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            {SITE_NAME}
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">{SITE_DESCRIPTION}</p>
        </section>

        <section>
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-slate-100">
            記事一覧 - ページ {currentPage}
          </h2>
          <ArticleList articles={articles} />
          <div className="mt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="" />
          </div>
        </section>
      </div>
    </>
  );
}
