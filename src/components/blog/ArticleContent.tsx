import { highlightCode } from '@/lib/utils/highlight';

type ArticleContentProps = {
  content: string;
};

export async function ArticleContent({ content }: ArticleContentProps) {
  const highlightedContent = await highlightCode(content);

  return (
    <div
      className="prose prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 prose-pre:bg-transparent prose-pre:p-0 dark:prose-a:text-blue-400 max-w-none [&_.shiki]:overflow-x-auto [&_.shiki]:rounded-lg [&_.shiki]:p-4 [&_.shiki]:text-sm [&_.shiki.github-dark]:hidden [&_.shiki.github-light]:block dark:[&_.shiki.github-dark]:block dark:[&_.shiki.github-light]:hidden"
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    />
  );
}
