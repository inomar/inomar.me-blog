import { Skeleton } from '@/components/ui/Skeleton';

export default function BlogDetailLoading() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb skeleton */}
      <Skeleton className="mb-6 h-4 w-64" />

      {/* Header skeleton */}
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="mb-4 h-10 w-full" />
        <Skeleton className="mb-4 h-10 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </header>

      {/* Thumbnail skeleton */}
      <Skeleton className="mb-8 aspect-video w-full rounded-lg" />

      {/* Content skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-8 h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  );
}
