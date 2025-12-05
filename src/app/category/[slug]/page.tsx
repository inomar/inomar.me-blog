import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/blog/ArticleList';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { SITE_URL } from '@/lib/constants';
import { getBlogsByCategory, getCategories, getCategoryBySlug } from '@/lib/microcms/api';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents: categories } = await getCategories();
  return categories
    .filter((category) => category.slug)
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'カテゴリーが見つかりません' };
  }

  const title = `${category.name}の記事一覧`;
  const description = category.description || `${category.name}に関する記事一覧`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/category/${category.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { contents: articles } = await getBlogsByCategory(category.id);

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
      </header>

      <ArticleList articles={articles} />
    </div>
  );
}
