import { ArticleCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-16">
        <div className="mb-4 h-10 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
        <div className="h-6 w-96 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
      </div>

      <div className="mb-8 h-8 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
