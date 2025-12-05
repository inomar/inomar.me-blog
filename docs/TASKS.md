# 不定期更新症候群 開発タスクリスト

## 凡例

- [ ] 未着手
- [x] 完了

---

## Phase 0: プロジェクトルール設定

### 0.1 パッケージ管理・バージョン管理

- [x] Volta設定 (`package.json` volta フィールド)
- [x] yarn へ移行 (`yarn.lock` 生成)
- [x] `package-lock.json` 削除

### 0.2 Linter/Formatter設定

- [x] ESLint設定更新 (`eslint.config.mjs`)
  - [x] Prettier連携 (`eslint-config-prettier`)
  - [x] import順序ルール (`eslint-plugin-import`)
- [x] Prettier設定 (`.prettierrc`, `.prettierignore`)
  - [x] Tailwind CSSプラグイン (`prettier-plugin-tailwindcss`)
- [x] EditorConfig (`.editorconfig`)
- [x] Git設定 (`.gitattributes`)

### 0.3 スクリプト整備

- [x] `lint` / `lint:fix` コマンド
- [x] `format` / `format:check` コマンド
- [x] `typecheck` コマンド

---

## Phase 1: 環境構築・基盤整備

### 1.1 microCMS セットアップ

- [x] microCMSアカウント作成・サービス作成
- [x] APIスキーマ設定
  - [x] blogs（ブログ記事）
  - [x] categories（カテゴリー）
  - [x] tags（タグ）
  - [x] profile（プロフィール）
- [x] テストコンテンツ投入

### 1.2 プロジェクト設定

- [x] 環境変数設定（`.env.local`）
- [x] microCMS SDKインストール (`microcms-js-sdk`)
- [x] microCMSクライアント実装 (`src/lib/microcms/client.ts`)
- [x] 型定義作成 (`src/lib/microcms/types.ts`)
- [x] API関数実装 (`src/lib/microcms/api.ts`)

### 1.3 追加パッケージインストール

- [x] `microcms-js-sdk` - microCMS SDK
- [x] `date-fns` - 日付操作
- [x] `shiki` - シンタックスハイライト
- [x] `rehype-slug` - 見出しにID付与
- [x] `remark-gfm` - GFM対応

---

## Phase 2: レイアウト・共通コンポーネント

### 2.1 レイアウト構築

- [x] ルートレイアウト更新 (`src/app/layout.tsx`)
  - [x] フォント設定（Noto Sans JP, JetBrains Mono）
  - [x] メタデータベース設定
  - [ ] Google Analytics設定
- [x] ヘッダーコンポーネント (`src/components/layout/Header.tsx`)
  - [x] ロゴ / サイト名
  - [x] ナビゲーション
  - [x] ダークモード切替
- [x] フッターコンポーネント (`src/components/layout/Footer.tsx`)
  - [x] コピーライト
  - [x] SNSリンク
  - [x] サイトリンク

### 2.2 UIコンポーネント

- [ ] ボタン (`src/components/ui/Button.tsx`)
- [x] タグ (`src/components/ui/Tag.tsx`)
- [x] ページネーション (`src/components/ui/Pagination.tsx`)
- [x] 検索入力 (`src/components/ui/SearchInput.tsx`)
- [x] スケルトンローダー (`src/components/ui/Skeleton.tsx`)

### 2.3 ダークモード実装

- [x] テーマプロバイダー設定
- [x] システム設定連動
- [x] 手動切替機能
- [x] LocalStorage永続化

---

## Phase 3: ブログ機能実装

### 3.1 トップページ (`/`)

- [x] 記事一覧取得・表示
- [x] 記事カードコンポーネント (`src/components/blog/ArticleCard.tsx`)
- [x] 記事リストコンポーネント (`src/components/blog/ArticleList.tsx`)
- [x] ページネーション実装

### 3.2 記事詳細ページ (`/blog/[slug]`)

- [x] 動的ルーティング設定
- [x] 記事コンテンツ取得
- [x] リッチテキストレンダリング (`src/components/blog/ArticleContent.tsx`)
- [x] シンタックスハイライト適用
- [x] 目次自動生成 (`src/components/blog/TableOfContents.tsx`)
- [x] 関連記事表示
- [x] 前後記事ナビゲーション (`src/components/blog/ArticleNavigation.tsx`)
- [x] SNSシェアボタン (`src/components/blog/ShareButtons.tsx`)

### 3.3 カテゴリーページ (`/category/[slug]`)

- [x] カテゴリー別記事一覧取得
- [x] ページネーション

### 3.4 タグページ (`/tag/[slug]`)

- [x] タグ別記事一覧取得
- [x] ページネーション

### 3.5 プロフィールページ (`/about`)

- [x] プロフィール情報取得・表示（プレースホルダー）
- [x] SNSリンク表示

### 3.6 検索機能 (`/search`)

- [x] 検索UI実装 (`src/app/search/page.tsx`)
- [x] microCMS検索API連携 (`searchBlogs`)
- [x] 検索結果表示

---

## Phase 4: SEO対策実装

### 4.1 メタデータ設定

- [x] サイト共通メタデータ（`layout.tsx`）
- [x] トップページメタデータ
- [x] 記事詳細ページメタデータ（動的生成）
- [x] カテゴリーページメタデータ
- [x] タグページメタデータ
- [x] プロフィールページメタデータ

### 4.2 Open Graph / Twitter Card

- [x] OGP画像生成（または固定画像設定）
- [x] 各ページのOG設定
- [x] Twitter Card設定

### 4.3 構造化データ (JSON-LD)

- [x] JSON-LDコンポーネント (`src/components/seo/JsonLd.tsx`)
- [x] WebSiteスキーマ（トップページ）
- [x] BlogPostingスキーマ（記事ページ）
- [x] BreadcrumbListスキーマ
- [x] Personスキーマ（プロフィール）

### 4.4 パンくずリスト

- [x] パンくずコンポーネント (`src/components/seo/Breadcrumb.tsx`)
- [x] 各ページへの設置

### 4.5 サイトマップ・robots.txt

- [x] サイトマップ動的生成 (`src/app/sitemap.ts`)
- [x] robots.txt生成 (`src/app/robots.ts`)

### 4.6 RSSフィード

- [x] RSSフィード生成 (`src/app/feed.xml/route.ts`)

### 4.7 canonical URL

- [x] 各ページにcanonical URL設定

---

## Phase 5: パフォーマンス最適化

### 5.1 画像最適化

- [ ] next/image使用徹底
- [ ] 適切なサイズ・フォーマット設定
- [ ] プレースホルダー（blur）設定

### 5.2 静的生成・キャッシュ

- [x] 静的ページ生成設定
- [x] ISR設定（revalidate）
- [x] generateStaticParams実装

### 5.3 Core Web Vitals対策

- [ ] LCP最適化（ファーストビュー画像優先読み込み）
- [x] CLS対策（画像サイズ明示、フォントディスプレイ設定）
- [ ] FID対策（JSバンドル最適化）

### 5.4 Lighthouse監査

- [ ] Performance 90以上
- [ ] Accessibility 90以上
- [ ] Best Practices 90以上
- [ ] SEO 90以上

---

## Phase 6: エラーハンドリング・仕上げ

### 6.1 エラーページ

- [x] 404ページ (`src/app/not-found.tsx`)
- [x] エラーページ (`src/app/error.tsx`)
- [x] グローバルエラーページ (`src/app/global-error.tsx`)

### 6.2 ローディング

- [x] ローディングUI (`src/app/loading.tsx`)
- [x] Suspense境界設定

### 6.3 アクセシビリティ

- [x] セマンティックHTML確認
- [x] ARIAラベル設定
- [ ] キーボードナビゲーション確認
- [ ] カラーコントラスト確認

---

## Phase 7: デプロイ・公開準備

### 7.1 Vercelデプロイ

- [ ] Vercelプロジェクト作成
- [ ] 環境変数設定
- [ ] カスタムドメイン設定（inomar.me）
- [ ] HTTPS確認

### 7.2 分析ツール連携

- [ ] Google Analytics 4設定
- [ ] Google Search Console登録
- [ ] サイトマップ送信

### 7.3 microCMS Webhook

- [ ] Webhook設定（コンテンツ更新時の再ビルド）

### 7.4 最終確認

- [ ] 全ページ動作確認
- [ ] レスポンシブ確認（モバイル/タブレット/デスクトップ）
- [ ] ダークモード確認
- [ ] OGP表示確認（Twitter/Facebook）
- [ ] 構造化データテスト（Google Rich Results Test）
- [ ] PageSpeed Insights確認

---

## 追加機能（将来対応）

- [ ] コメント機能（giscus等）
- [ ] いいね機能
- [ ] 閲覧数表示
- [ ] ニュースレター購読
- [ ] 記事シリーズ機能
- [ ] 多言語対応（i18n）

---

## 進捗サマリー

| Phase | タスク数 | 完了 | 進捗 |
|-------|---------|------|------|
| Phase 0: プロジェクトルール | 12 | 12 | 100% |
| Phase 1: 環境構築 | 13 | 13 | 100% |
| Phase 2: レイアウト | 15 | 14 | 93% |
| Phase 3: ブログ機能 | 18 | 18 | 100% |
| Phase 4: SEO対策 | 15 | 15 | 100% |
| Phase 5: パフォーマンス | 10 | 4 | 40% |
| Phase 6: エラーハンドリング | 8 | 7 | 88% |
| Phase 7: デプロイ | 10 | 0 | 0% |
| **合計** | **101** | **87** | **86%** |
