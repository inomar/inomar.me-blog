import { Metadata } from 'next';
import Image from 'next/image';

import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { JsonLd } from '@/components/seo/JsonLd';
import { SOCIAL_LINKS } from '@/lib/constants';
import { getProfile } from '@/lib/microcms/api';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case 'x':
      return <XIcon className={className} />;
    case 'github':
      return <GitHubIcon className={className} />;
    default:
      return null;
  }
}

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    title: 'About',
    description: profile ? `${profile.name}のプロフィールページです。` : 'プロフィールページ',
  };
}

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      {profile && (
        <JsonLd
          type="Person"
          name={profile.name}
          description={profile.bio}
          image={profile.avatar?.url}
        />
      )}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumb items={[{ label: 'About', href: '/about' }]} />

      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-slate-100">About</h1>

      <div className="prose dark:prose-invert max-w-none">
        {profile?.about && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-slate-100">
              このブログについて
            </h2>
            <p className="whitespace-pre-wrap text-gray-600 dark:text-slate-400">
              {profile.about}
            </p>
          </section>
        )}

        {profile && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-slate-100">
              プロフィール
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-4">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar.url}
                    alt={profile.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                    {profile.name}
                  </h3>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-gray-600 dark:text-slate-400">
                {profile.bio}
              </p>
              <div className="mt-6 flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    aria-label={link.label}
                  >
                    <SocialIcon icon={link.icon} className="h-5 w-5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      </div>
    </>
  );
}
