import { codeToHtml } from 'shiki';

// テキストからslugを生成
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

// 見出しにIDを追加
function addHeadingIds(html: string): string {
  const headingRegex = /<h([2-4])>([^<]*)<\/h[2-4]>/gi;
  const usedIds = new Set<string>();

  return html.replace(headingRegex, (match, level, text) => {
    let id = slugify(text);

    // 重複IDを回避
    let counter = 1;
    const originalId = id;
    while (usedIds.has(id)) {
      id = `${originalId}-${counter}`;
      counter++;
    }
    usedIds.add(id);

    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

// microCMSのリッチエディタから出力されるコードブロックのHTMLを
// shikiでシンタックスハイライトされたHTMLに変換する
export async function highlightCode(html: string): Promise<string> {
  // 見出しにIDを追加
  let result = addHeadingIds(html);

  // <pre><code class="language-xxx">...</code></pre> パターンを検出
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  const matches = [...result.matchAll(codeBlockRegex)];

  if (matches.length === 0) {
    return result;
  }

  for (const match of matches) {
    const [fullMatch, lang, code] = match;

    // HTMLエンティティをデコード
    const decodedCode = decodeHtmlEntities(code);

    try {
      const highlighted = await codeToHtml(decodedCode, {
        lang: lang || 'text',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      });

      result = result.replace(fullMatch, highlighted);
    } catch {
      // サポートされていない言語の場合はそのまま
      console.warn(`Unsupported language: ${lang}`);
    }
  }

  return result;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
