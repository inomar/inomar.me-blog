'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-gray-900">
        <h1 className="mb-4 text-4xl font-bold">予期せぬエラーが発生しました</h1>
        <p className="mb-8 text-center text-gray-500">
          申し訳ありませんが、重大な問題が発生しました。
          <br />
          しばらくしてからもう一度お試しください。
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          もう一度試す
        </button>
      </body>
    </html>
  );
}
