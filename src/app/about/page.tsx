import { Metadata } from 'next';
import Image from 'next/image';

import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { getProfile } from '@/lib/microcms/api';

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
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
