export const SITE_NAME = '不定期更新症候群';
export const SITE_DESCRIPTION = '個人の趣味・技術系ブログ';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inomar.me';
export const AUTHOR_NAME = 'inomar';

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com/inomar0722', icon: 'x' },
  { label: 'GitHub', href: 'https://github.com/inomar', icon: 'github' },
] as const;
