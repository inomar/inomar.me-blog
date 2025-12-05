import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';

type WebSiteJsonLdProps = {
  type: 'WebSite';
};

type BlogPostingJsonLdProps = {
  type: 'BlogPosting';
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
};

type PersonJsonLdProps = {
  type: 'Person';
  name: string;
  description: string;
  image?: string;
};

type JsonLdProps = WebSiteJsonLdProps | BlogPostingJsonLdProps | PersonJsonLdProps;

export function JsonLd(props: JsonLdProps) {
  let jsonLd: object;

  if (props.type === 'WebSite') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (props.type === 'Person') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: props.name,
      description: props.description,
      image: props.image,
      url: `${SITE_URL}/about`,
    };
  } else {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: props.title,
      description: props.description,
      image: props.image,
      datePublished: props.datePublished,
      dateModified: props.dateModified || props.datePublished,
      author: {
        '@type': 'Person',
        name: AUTHOR_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
