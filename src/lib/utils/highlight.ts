import { codeToHtml } from 'shiki';

// microCMSのリッチエディタから出力されるコードブロックのHTMLを
// shikiでシンタックスハイライトされたHTMLに変換する
export async function highlightCode(html: string): Promise<string> {
  // <pre><code class="language-xxx">...</code></pre> パターンを検出
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  const matches = [...html.matchAll(codeBlockRegex)];

  if (matches.length === 0) {
    return html;
  }

  let result = html;

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
