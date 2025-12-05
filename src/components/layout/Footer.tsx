import Link from 'next/link';

import { NAV_ITEMS, SITE_NAME } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="text-lg font-bold text-gray-900 dark:text-slate-100">
              {SITE_NAME}
            </Link>
            <p className="text-sm text-gray-500 dark:text-slate-400">個人の趣味・技術系ブログ</p>
          </div>

          <nav>
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  RSS
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center dark:border-slate-700">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
