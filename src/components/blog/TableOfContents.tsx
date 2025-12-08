type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  content: string;
};

// highlight.tsと同じslugify関数
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function extractHeadings(html: string): TocItem[] {
  // 属性付きの見出しタグにも対応
  const headingRegex = /<h([2-4])(\s[^>]*)?>([^<]*)<\/h[2-4]>/gi;
  const headings: TocItem[] = [];
  const usedIds = new Set<string>();

  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const attrs = match[2] || '';
    const text = match[3].trim();

    if (text) {
      // 既存のidがあればそれを使用、なければ生成
      const existingIdMatch = attrs.match(/\sid=["']([^"']*)["']/);
      let id: string;

      if (existingIdMatch) {
        id = existingIdMatch[1];
      } else {
        // highlight.tsと同じID生成ロジック
        id = slugify(text);
        let counter = 1;
        const originalId = id;
        while (usedIds.has(id)) {
          id = `${originalId}-${counter}`;
          counter++;
        }
      }
      usedIds.add(id);

      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-3 text-sm font-bold text-gray-900 dark:text-slate-100">目次</h2>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
