import Image from 'next/image';
import Link from 'next/link';

import type { Blog } from '@/lib/microcms/types';
import { formatDate } from '@/lib/utils/date';

const PLACEHOLDER_EMOJIS = [
  '📝',
  '💡',
  '🚀',
  '⚡',
  '🎯',
  '🔧',
  '💻',
  '📚',
  '🎨',
  '🌟',
  '✨',
  '🔥',
  '💪',
  '🎉',
  '📖',
  '🛠️',
];

function getRandomEmoji(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % PLACEHOLDER_EMOJIS.length;
  return PLACEHOLDER_EMOJIS[index];
}

type ArticleCardProps = {
  article: Blog;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const placeholderEmoji = getRandomEmoji(article.id);

  return (
    <article className="group rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <Link href={`/blog/${article.slug}`} className="block">
        {article.thumbnail ? (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
            <span className="text-6xl">{placeholderEmoji}</span>
          </div>
        )}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-slate-700 dark:text-slate-300">
              {article.category.name}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-slate-400">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
