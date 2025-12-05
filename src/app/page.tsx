import { ArticleList } from '@/components/blog/ArticleList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Pagination } from '@/components/ui/Pagination';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { getBlogs } from '@/lib/microcms/api';

const POSTS_PER_PAGE = 10;

export const revalidate = 60;

export default async function Home() {
  const { contents: articles, totalCount } = await getBlogs({ limit: POSTS_PER_PAGE });
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

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
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-slate-100">最新の記事</h2>
          <ArticleList articles={articles} />
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={1} totalPages={totalPages} basePath="" />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
