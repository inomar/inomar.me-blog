export const SITE_NAME = '不定期更新症候群';
export const SITE_TAGLINE = '弾きたい気持ちだけは一人前';
export const SITE_DESCRIPTION =
  'ベース弾きたいけど時間ない、お金ない、準備だるい。そんな社会人あるあるに寄り添う、ゆるっと不定期更新ブログです。たまにWeb開発の話も。';
export const SITE_OG_DESCRIPTION =
  '時間ない、お金ない、準備だるい。それでもベース弾きたい社会人のゆるっとブログ。';
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
