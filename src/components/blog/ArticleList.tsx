import type { Blog } from '@/lib/microcms/types';

import { ArticleCard } from './ArticleCard';

type ArticleListProps = {
  articles: Blog[];
};

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 dark:text-slate-400">記事がありません</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
