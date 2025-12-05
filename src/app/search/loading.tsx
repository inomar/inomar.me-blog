import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb skeleton */}
      <Skeleton className="mb-6 h-4 w-48" />

      {/* Header skeleton */}
      <header className="mb-8">
        <Skeleton className="mb-6 h-8 w-32" />
        <Skeleton className="h-10 w-full max-w-md" />
      </header>

      {/* Results skeleton */}
      <section>
        <Skeleton className="mb-6 h-6 w-48" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
