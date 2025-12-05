import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/blog/ArticleList';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { SITE_URL } from '@/lib/constants';
import { getBlogsByTag, getTagBySlug, getTags } from '@/lib/microcms/api';

const POSTS_PER_PAGE = 10;

type Props = {
  params: Promise<{ slug: string; page: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents: tags } = await getTags();
  const params: { slug: string; page: string }[] = [];

  for (const tag of tags) {
    if (!tag.slug) continue;
    const { totalCount } = await getBlogsByTag(tag.id, { limit: 1 });
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    for (let i = 2; i <= totalPages; i++) {
      params.push({ slug: tag.slug, page: String(i) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return { title: 'タグが見つかりません' };
  }

  const title = `#${tag.name}の記事一覧 - ページ${page}`;
  const description = `${tag.name}タグが付いた記事一覧`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tag/${tag.slug}/page/${page}`,
    },
    alternates: {
      canonical: `${SITE_URL}/tag/${tag.slug}/page/${page}`,
    },
  };
}

export default async function PaginatedTagPage({ params }: Props) {
  const { slug, page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }

  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const { contents: articles, totalCount } = await getBlogsByTag(tag.id, {
    offset,
    limit: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={[{ label: `#${tag.name}`, href: `/tag/${tag.slug}` }]} />

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-slate-100">#{tag.name}</h1>
        <p className="text-gray-600 dark:text-slate-400">{totalCount}件の記事</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">ページ {currentPage}</p>
      </header>

      <ArticleList articles={articles} />
      <div className="mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/tag/${slug}`} />
      </div>
    </div>
  );
}
