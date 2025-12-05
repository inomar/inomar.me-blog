import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-slate-100">404</h1>
      <h2 className="mb-4 text-xl font-medium text-gray-600 dark:text-slate-400">
        ページが見つかりません
      </h2>
      <p className="mb-8 text-center text-gray-500 dark:text-slate-500">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
