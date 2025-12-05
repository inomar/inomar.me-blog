'use client';

import { SITE_URL } from '@/lib/constants';

type ShareButtonsProps = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bgColor: 'bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200',
      textColor: 'text-white dark:text-black',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
      textColor: 'text-white',
    },
    {
      name: 'はてなブックマーク',
      href: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodedUrl}&title=${encodedTitle}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.47 21.776c-.14.14-.32.224-.53.224H4.06c-.21 0-.39-.084-.53-.224-.14-.14-.224-.32-.224-.53V2.754c0-.21.084-.39.224-.53.14-.14.32-.224.53-.224h15.88c.21 0 .39.084.53.224.14.14.224.32.224.53v18.492c0 .21-.084.39-.224.53zM13.42 16.58c.28-.28.42-.616.42-1.008 0-.392-.14-.728-.42-1.008-.28-.28-.616-.42-1.008-.42-.392 0-.728.14-1.008.42-.28.28-.42.616-.42 1.008 0 .392.14.728.42 1.008.28.28.616.42 1.008.42.392 0 .728-.14 1.008-.42zM13.776 6.524H11.06v6.72h2.716v-6.72z" />
        </svg>
      ),
      bgColor: 'bg-[#00A4DE] hover:bg-[#0094C8]',
      textColor: 'text-white',
    },
    {
      name: 'LINE',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      bgColor: 'bg-[#00B900] hover:bg-[#00A000]',
      textColor: 'text-white',
    },
  ];

  const handleShare = (href: string) => {
    window.open(href, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-slate-700">
      <p className="mb-3 text-sm font-medium text-gray-700 dark:text-slate-300">この記事をシェア</p>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleShare(link.href)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${link.bgColor} ${link.textColor}`}
            aria-label={`${link.name}でシェア`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
