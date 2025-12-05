# 不定期更新症候群 ブログ仕様書

## 1. プロジェクト概要

個人の趣味・技術系ブログサイト「不定期更新症候群」。microCMSをヘッドレスCMSとして採用し、SEO対策を徹底したモダンなブログを構築する。

### 1.1 サイト情報

| 項目 | 値 |
|------|------|
| サイト名 | 不定期更新症候群 |
| ドメイン | inomar.me |
| コンセプト | シンプルで読みやすい技術・趣味ブログ |

### 1.2 目的

- 技術記事・趣味に関する情報発信
- ポートフォリオとしての活用
- 検索エンジンからの流入最大化

### 1.3 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS 4 |
| CMS | microCMS |
| ホスティング | Vercel |
| パッケージ管理 | yarn |
| バージョン管理 | Volta (Node.js, yarn) |
| Linter | ESLint |
| Formatter | Prettier |

---

## 2. microCMS設計

### 2.1 API設計

#### 2.1.1 ブログ記事 (`blogs`)

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| title | タイトル | テキストフィールド | ○ |
| slug | スラッグ | テキストフィールド | ○ |
| description | 説明文 | テキストフィールド | ○ |
| content | 本文 | リッチエディタ | ○ |
| thumbnail | サムネイル | 画像 | - |
| category | カテゴリー | コンテンツ参照（categories） | ○ |
| tags | タグ | 複数コンテンツ参照（tags） | - |

※ 公開日(`publishedAt`)・更新日(`updatedAt`)・作成日(`createdAt`)はmicroCMSのデフォルトフィールドを使用

#### 2.1.2 カテゴリー (`categories`)

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| name | カテゴリー名 | テキストフィールド | ○ |
| slug | スラッグ | テキストフィールド | ○ |
| description | 説明 | テキストフィールド | - |

#### 2.1.3 タグ (`tags`)

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| name | タグ名 | テキストフィールド | ○ |
| slug | スラッグ | テキストフィールド | ○ |

#### 2.1.4 プロフィール (`profile`)

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| name | 名前 | テキストフィールド | ○ |
| bio | 自己紹介 | テキストエリア | ○ |
| avatar | アバター画像 | 画像 | - |

---

## 3. ページ構成

```
/                           # トップページ（記事一覧）
/blog/[slug]               # 記事詳細ページ
/category/[slug]           # カテゴリー別記事一覧
/tag/[slug]                # タグ別記事一覧
/about                     # プロフィールページ
/search                    # 検索ページ
```

### 3.1 トップページ (`/`)

- 最新記事一覧（ページネーション付き）
- カテゴリーナビゲーション
- 人気記事/おすすめ記事セクション

### 3.2 記事詳細ページ (`/blog/[slug]`)

- 記事本文
- 目次（自動生成）
- 関連記事
- SNSシェアボタン
- 前後の記事ナビゲーション

### 3.3 カテゴリー/タグページ

- フィルタリングされた記事一覧
- ページネーション

### 3.4 プロフィールページ (`/about`)

- 自己紹介
- スキルセット
- SNSリンク

### 3.5 検索ページ (`/search`)

- キーワード検索
- 検索結果一覧

---

## 4. SEO対策

### 4.1 メタデータ最適化

#### 4.1.1 基本メタタグ

```tsx
// 各ページで動的に生成
export const metadata: Metadata = {
  title: string,           // ページタイトル | サイト名
  description: string,     // 120-160文字程度
  keywords: string[],      // 関連キーワード
  authors: [{ name: string }],
  creator: string,
}
```

#### 4.1.2 Open Graph

```tsx
openGraph: {
  title: string,
  description: string,
  url: string,
  siteName: string,
  images: [{
    url: string,
    width: 1200,
    height: 630,
    alt: string,
  }],
  locale: 'ja_JP',
  type: 'website' | 'article',
}
```

#### 4.1.3 Twitter Card

```tsx
twitter: {
  card: 'summary_large_image',
  title: string,
  description: string,
  images: [string],
  creator: '@handle',
}
```

### 4.2 構造化データ (JSON-LD)

#### 4.2.1 WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "不定期更新症候群",
  "url": "https://inomar.me",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://inomar.me/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### 4.2.2 BlogPosting（記事ページ）

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "記事タイトル",
  "image": "サムネイルURL",
  "datePublished": "2024-01-01T00:00:00+09:00",
  "dateModified": "2024-01-02T00:00:00+09:00",
  "author": {
    "@type": "Person",
    "name": "著者名"
  },
  "publisher": {
    "@type": "Organization",
    "name": "不定期更新症候群",
    "logo": {
      "@type": "ImageObject",
      "url": "ロゴURL"
    }
  },
  "description": "記事の説明"
}
```

#### 4.2.3 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://inomar.me"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "カテゴリー名",
      "item": "https://inomar.me/category/xxx"
    }
  ]
}
```

### 4.3 技術的SEO

#### 4.3.1 サイトマップ (`/sitemap.xml`)

- 動的生成（Next.js Sitemap機能）
- 全ページのURL、更新日、優先度を含む

#### 4.3.2 robots.txt

```txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://inomar.me/sitemap.xml
```

#### 4.3.3 canonical URL

- 各ページに正規URLを設定
- 重複コンテンツ防止

### 4.4 パフォーマンス最適化

#### 4.4.1 Core Web Vitals

| 指標 | 目標値 |
|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

#### 4.4.2 実装方針

- **画像最適化**: next/image による自動最適化、WebP/AVIF対応
- **フォント最適化**: next/font によるフォント最適化
- **静的生成**: ISR (Incremental Static Regeneration) の活用
- **プリフェッチ**: next/link によるページプリフェッチ
- **コード分割**: 動的インポートによるバンドルサイズ削減

### 4.5 RSS フィード

- `/feed.xml` で RSS 2.0 フィードを提供
- Feedly 等のリーダー対応

---

## 5. 機能要件

### 5.1 コア機能

| 機能 | 詳細 |
|------|------|
| 記事表示 | Markdown/リッチテキストのレンダリング |
| シンタックスハイライト | コードブロックのハイライト表示 |
| 目次自動生成 | 見出しから目次を自動生成 |
| ページネーション | 記事一覧のページ分割 |
| カテゴリー/タグフィルター | 記事の絞り込み |
| 検索機能 | 全文検索 |
| ダークモード | システム設定連動 + 手動切替 |

### 5.2 UI/UX

| 項目 | 詳細 |
|------|------|
| レスポンシブ | モバイルファースト設計 |
| アクセシビリティ | WCAG 2.1 AA準拠 |
| ローディング | スケルトンスクリーン |
| エラーハンドリング | 404/500ページ |

### 5.3 分析/計測

| 項目 | ツール |
|------|--------|
| アクセス解析 | Google Analytics 4 |
| 検索パフォーマンス | Google Search Console |

---

## 6. ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # トップページ
│   ├── globals.css             # グローバルスタイル
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx        # 記事詳細
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx        # カテゴリー一覧
│   ├── tag/
│   │   └── [slug]/
│   │       └── page.tsx        # タグ一覧
│   ├── about/
│   │   └── page.tsx            # プロフィール
│   ├── search/
│   │   └── page.tsx            # 検索
│   ├── sitemap.ts              # サイトマップ生成
│   ├── robots.ts               # robots.txt生成
│   └── feed.xml/
│       └── route.ts            # RSSフィード
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   ├── ArticleContent.tsx
│   │   ├── TableOfContents.tsx
│   │   └── RelatedArticles.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Tag.tsx
│   │   ├── Pagination.tsx
│   │   └── SearchInput.tsx
│   └── seo/
│       ├── JsonLd.tsx
│       └── Breadcrumb.tsx
├── lib/
│   ├── microcms/
│   │   ├── client.ts           # microCMSクライアント
│   │   ├── types.ts            # 型定義
│   │   └── api.ts              # API関数
│   └── utils/
│       ├── date.ts             # 日付フォーマット
│       └── string.ts           # 文字列ユーティリティ
└── styles/
    └── syntax-highlight.css    # シンタックスハイライト
```

---

## 7. 環境変数

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=xxx
MICROCMS_API_KEY=xxx

# サイト設定
NEXT_PUBLIC_SITE_URL=https://inomar.me
NEXT_PUBLIC_SITE_NAME=不定期更新症候群
NEXT_PUBLIC_SITE_DESCRIPTION=個人の趣味・技術系ブログ

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 8. 非機能要件

### 8.1 パフォーマンス

- Lighthouse スコア: 90以上（全項目）
- 初回ロード: 3秒以内

### 8.2 セキュリティ

- HTTPS強制
- CSP (Content Security Policy) 設定
- XSS対策

### 8.3 可用性

- Vercel Edge Networkによる高可用性
- ISRによるキャッシュ戦略

---

## 9. デザインガイドライン

### 9.1 デザインコンセプト

**シンプル & ミニマル**
- 余計な装飾を排除し、コンテンツに集中できるデザイン
- 余白を活かしたクリーンなレイアウト
- 読みやすさを最優先

### 9.2 カラーパレット

#### ライトモード

| 用途 | カラー | Tailwind |
|------|--------|----------|
| 背景 | #FFFFFF | white |
| サブ背景 | #F9FAFB | gray-50 |
| テキスト（メイン） | #111827 | gray-900 |
| テキスト（サブ） | #6B7280 | gray-500 |
| ボーダー | #E5E7EB | gray-200 |
| アクセント | #2563EB | blue-600 |

#### ダークモード

| 用途 | カラー | Tailwind |
|------|--------|----------|
| 背景 | #0F172A | slate-900 |
| サブ背景 | #1E293B | slate-800 |
| テキスト（メイン） | #F1F5F9 | slate-100 |
| テキスト（サブ） | #94A3B8 | slate-400 |
| ボーダー | #334155 | slate-700 |
| アクセント | #3B82F6 | blue-500 |

### 9.3 タイポグラフィ

| 要素 | フォント | サイズ | ウェイト |
|------|----------|--------|----------|
| 見出し（h1） | Noto Sans JP | 2rem (32px) | 700 |
| 見出し（h2） | Noto Sans JP | 1.5rem (24px) | 700 |
| 見出し（h3） | Noto Sans JP | 1.25rem (20px) | 600 |
| 本文 | Noto Sans JP | 1rem (16px) | 400 |
| コード | JetBrains Mono | 0.875rem (14px) | 400 |

### 9.4 スペーシング

- 基本単位: 4px (Tailwind default)
- セクション間: 64px (16)
- コンポーネント間: 24px (6)
- 要素間: 16px (4)

### 9.5 コンポーネントスタイル

#### カード
- 背景: サブ背景色
- ボーダー: なし または 1px solid ボーダー色
- 角丸: 8px (rounded-lg)
- シャドウ: なし または shadow-sm

#### ボタン
- プライマリ: アクセント色背景、白テキスト
- セカンダリ: 透明背景、ボーダー
- サイズ: 高さ 40px、padding 16px

#### リンク
- 色: アクセント色
- ホバー: 下線表示
- 訪問済み: 変更なし

### 9.6 レスポンシブブレークポイント

| 名称 | 幅 | 用途 |
|------|-----|------|
| sm | 640px | モバイル（横向き） |
| md | 768px | タブレット |
| lg | 1024px | デスクトップ |
| xl | 1280px | ワイドデスクトップ |

### 9.7 コンテンツ幅

- 最大幅: 768px (記事本文)
- サイト最大幅: 1280px

---

## 10. 開発ルール

### 10.1 バージョン管理 (Volta)

```json
// package.json
{
  "volta": {
    "node": "22.12.0",
    "yarn": "1.22.22"
  }
}
```

### 10.2 ESLint設定

Next.js 15+のFlat Config形式を採用。

```js
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // カスタムルール
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
  },
];

export default eslintConfig;
```

### 10.3 Prettier設定

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 10.4 EditorConfig

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 10.5 Git設定

```
# .gitattributes
* text=auto eol=lf
*.png binary
*.jpg binary
*.ico binary
```

### 10.6 コーディング規約

#### ファイル・ディレクトリ命名
- コンポーネント: PascalCase (`ArticleCard.tsx`)
- ユーティリティ: camelCase (`formatDate.ts`)
- ディレクトリ: kebab-case (`article-card/`)

#### コンポーネント設計
- 関数コンポーネントを使用
- Props型は `type` で定義
- デフォルトエクスポートを使用（ページコンポーネント）
- 名前付きエクスポートを使用（共通コンポーネント）

#### インポート順序
1. React/Next.js
2. 外部ライブラリ
3. 内部モジュール（`@/`）
4. 相対パス

### 10.7 スクリプト

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit"
  }
}
```
