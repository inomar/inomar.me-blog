import { Skeleton } from '@/components/ui/Skeleton';

export default function TagLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb skeleton */}
      <Skeleton className="mb-6 h-4 w-64" />

      {/* Header skeleton */}
      <header className="mb-8">
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </header>

      {/* Article list skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
