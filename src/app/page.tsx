import { ArticleList } from '@/components/blog/ArticleList';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { getBlogs } from '@/lib/microcms/api';

export const revalidate = 60;

export default async function Home() {
  const { contents: articles } = await getBlogs({ limit: 10 });

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
        </section>
      </div>
    </>
  );
}
