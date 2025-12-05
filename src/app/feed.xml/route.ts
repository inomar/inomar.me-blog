import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { getBlogs } from '@/lib/microcms/api';

export async function GET() {
  const { contents: blogs } = await getBlogs({ limit: 20 });

  const items = blogs
    .map(
      (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${SITE_URL}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${blog.slug}</guid>
      <description><![CDATA[${blog.description}]]></description>
      <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>
      <author>${AUTHOR_NAME}</author>
      <category>${blog.category.name}</category>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
