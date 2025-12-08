import Image from 'next/image';

export type ProductData = {
  url: string;
  title: string;
  image?: string;
  price?: string;
  description?: string;
  seller?: string;
};

type ProductCardProps = {
  product: ProductData;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        {product.image && (
          <div className="relative aspect-square w-full shrink-0 bg-gray-50 sm:w-40 dark:bg-slate-700">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h4 className="line-clamp-2 font-bold text-gray-900 dark:text-slate-100">
              {product.title}
            </h4>
            <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-slate-700 dark:text-slate-400">
              PR
            </span>
          </div>

          {product.description && (
            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-slate-400">
              {product.description}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              {product.price && (
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{product.price}</p>
              )}
              {product.seller && (
                <p className="text-xs text-gray-500 dark:text-slate-500">{product.seller}</p>
              )}
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex shrink-0 items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              詳細を見る
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
