'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-slate-100">
        エラーが発生しました
      </h1>
      <p className="mb-8 text-center text-gray-500 dark:text-slate-500">
        申し訳ありませんが、問題が発生しました。
        <br />
        しばらくしてからもう一度お試しください。
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        もう一度試す
      </button>
    </div>
  );
}
