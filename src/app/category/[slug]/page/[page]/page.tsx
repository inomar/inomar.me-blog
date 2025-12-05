import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/blog/ArticleList';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { SITE_URL } from '@/lib/constants';
import { getBlogsByCategory, getCategories, getCategoryBySlug } from '@/lib/microcms/api';

const POSTS_PER_PAGE = 10;

type Props = {
  params: Promise<{ slug: string; page: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents: categories } = await getCategories();
  const params: { slug: string; page: string }[] = [];

  for (const category of categories) {
    if (!category.slug) continue;
    const { totalCount } = await getBlogsByCategory(category.id, { limit: 1 });
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    for (let i = 2; i <= totalPages; i++) {
      params.push({ slug: category.slug, page: String(i) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'カテゴリーが見つかりません' };
  }

  const title = `${category.name}の記事一覧 - ページ${page}`;
  const description = category.description || `${category.name}に関する記事一覧`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/category/${category.slug}/page/${page}`,
    },
    alternates: {
      canonical: `${SITE_URL}/category/${category.slug}/page/${page}`,
    },
  };
}

export default async function PaginatedCategoryPage({ params }: Props) {
  const { slug, page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const { contents: articles, totalCount } = await getBlogsByCategory(category.id, {
    offset,
    limit: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={[{ label: category.name, href: `/category/${category.slug}` }]} />

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-slate-100">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 dark:text-slate-400">{category.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">ページ {currentPage}</p>
      </header>

      <ArticleList articles={articles} />
      <div className="mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/category/${slug}`} />
      </div>
    </div>
  );
}
