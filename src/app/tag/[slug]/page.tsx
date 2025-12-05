import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/blog/ArticleList';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { SITE_URL } from '@/lib/constants';
import { getBlogsByTag, getTagBySlug, getTags } from '@/lib/microcms/api';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents: tags } = await getTags();
  return tags.filter((tag) => tag.slug).map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return { title: 'タグが見つかりません' };
  }

  const title = `#${tag.name}の記事一覧`;
  const description = `${tag.name}タグが付いた記事一覧`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tag/${tag.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/tag/${tag.slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const { contents: articles } = await getBlogsByTag(tag.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={[{ label: `#${tag.name}`, href: `/tag/${tag.slug}` }]} />

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-slate-100">#{tag.name}</h1>
        <p className="text-gray-600 dark:text-slate-400">{articles.length}件の記事</p>
      </header>

      <ArticleList articles={articles} />
    </div>
  );
}
