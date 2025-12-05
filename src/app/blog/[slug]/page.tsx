import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleContent } from '@/components/blog/ArticleContent';
import { ArticleNavigation } from '@/components/blog/ArticleNavigation';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { JsonLd } from '@/components/seo/JsonLd';
import { Tag } from '@/components/ui/Tag';
import { SITE_URL } from '@/lib/constants';
import { getAdjacentBlogs, getAllBlogSlugs, getBlogBySlug, getRelatedBlogs } from '@/lib/microcms/api';
import { formatDate } from '@/lib/utils/date';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    return { title: '記事が見つかりません' };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${SITE_URL}/blog/${article.slug}`,
      images: article.thumbnail ? [{ url: article.thumbnail.url }] : [],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.thumbnail ? [article.thumbnail.url] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  const [relatedArticles, adjacentBlogs] = await Promise.all([
    getRelatedBlogs(article.id, article.category.id, 3),
    getAdjacentBlogs(article.publishedAt),
  ]);

  return (
    <>
      <JsonLd
        type="BlogPosting"
        title={article.title}
        description={article.description}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        image={article.thumbnail?.url}
      />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumb
          items={[
            { label: article.category.name, href: `/category/${article.category.slug}` },
            { label: article.title, href: `/blog/${article.slug}` },
          ]}
        />

        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <Link
              href={`/category/${article.category.slug}`}
              className="rounded bg-gray-100 px-2 py-0.5 font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              {article.category.name}
            </Link>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-slate-100">
            {article.title}
          </h1>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} slug={tag.slug} size="sm" />
              ))}
            </div>
          )}
        </header>

        {article.thumbnail && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <TableOfContents content={article.content} />
        <ArticleContent content={article.content} />

        <ArticleNavigation prev={adjacentBlogs.prev} next={adjacentBlogs.next} />

        {relatedArticles.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-8 dark:border-slate-700">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-slate-100">関連記事</h2>
            <div className="grid gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <div className="text-sm text-gray-500 dark:text-slate-400">
                    {formatDate(related.publishedAt)}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-slate-100">{related.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
