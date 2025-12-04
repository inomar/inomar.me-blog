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

- [ ] microCMSアカウント作成・サービス作成
- [ ] APIスキーマ設定
  - [ ] blogs（ブログ記事）
  - [ ] categories（カテゴリー）
  - [ ] tags（タグ）
  - [ ] profile（プロフィール）
- [ ] テストコンテンツ投入

### 1.2 プロジェクト設定

- [ ] 環境変数設定（`.env.local`）
- [ ] microCMS SDKインストール (`microcms-js-sdk`)
- [ ] microCMSクライアント実装 (`src/lib/microcms/client.ts`)
- [ ] 型定義作成 (`src/lib/microcms/types.ts`)
- [ ] API関数実装 (`src/lib/microcms/api.ts`)

### 1.3 追加パッケージインストール

- [ ] `microcms-js-sdk` - microCMS SDK
- [ ] `date-fns` - 日付操作
- [ ] `shiki` - シンタックスハイライト
- [ ] `rehype-slug` - 見出しにID付与
- [ ] `remark-gfm` - GFM対応

---

## Phase 2: レイアウト・共通コンポーネント

### 2.1 レイアウト構築

- [ ] ルートレイアウト更新 (`src/app/layout.tsx`)
  - [ ] フォント設定（Noto Sans JP, JetBrains Mono）
  - [ ] メタデータベース設定
  - [ ] Google Analytics設定
- [ ] ヘッダーコンポーネント (`src/components/layout/Header.tsx`)
  - [ ] ロゴ / サイト名
  - [ ] ナビゲーション
  - [ ] ダークモード切替
- [ ] フッターコンポーネント (`src/components/layout/Footer.tsx`)
  - [ ] コピーライト
  - [ ] SNSリンク
  - [ ] サイトリンク

### 2.2 UIコンポーネント

- [ ] ボタン (`src/components/ui/Button.tsx`)
- [ ] タグ (`src/components/ui/Tag.tsx`)
- [ ] ページネーション (`src/components/ui/Pagination.tsx`)
- [ ] 検索入力 (`src/components/ui/SearchInput.tsx`)
- [ ] スケルトンローダー (`src/components/ui/Skeleton.tsx`)

### 2.3 ダークモード実装

- [ ] テーマプロバイダー設定
- [ ] システム設定連動
- [ ] 手動切替機能
- [ ] LocalStorage永続化

---

## Phase 3: ブログ機能実装

### 3.1 トップページ (`/`)

- [ ] 記事一覧取得・表示
- [ ] 記事カードコンポーネント (`src/components/blog/ArticleCard.tsx`)
- [ ] 記事リストコンポーネント (`src/components/blog/ArticleList.tsx`)
- [ ] ページネーション実装

### 3.2 記事詳細ページ (`/blog/[slug]`)

- [ ] 動的ルーティング設定
- [ ] 記事コンテンツ取得
- [ ] リッチテキストレンダリング (`src/components/blog/ArticleContent.tsx`)
- [ ] シンタックスハイライト適用
- [ ] 目次自動生成 (`src/components/blog/TableOfContents.tsx`)
- [ ] 関連記事表示 (`src/components/blog/RelatedArticles.tsx`)
- [ ] 前後記事ナビゲーション
- [ ] SNSシェアボタン

### 3.3 カテゴリーページ (`/category/[slug]`)

- [ ] カテゴリー別記事一覧取得
- [ ] ページネーション

### 3.4 タグページ (`/tag/[slug]`)

- [ ] タグ別記事一覧取得
- [ ] ページネーション

### 3.5 プロフィールページ (`/about`)

- [ ] プロフィール情報取得・表示
- [ ] SNSリンク表示

### 3.6 検索機能 (`/search`)

- [ ] 検索UI実装
- [ ] microCMS検索API連携
- [ ] 検索結果表示

---

## Phase 4: SEO対策実装

### 4.1 メタデータ設定

- [ ] サイト共通メタデータ（`layout.tsx`）
- [ ] トップページメタデータ
- [ ] 記事詳細ページメタデータ（動的生成）
- [ ] カテゴリーページメタデータ
- [ ] タグページメタデータ
- [ ] プロフィールページメタデータ

### 4.2 Open Graph / Twitter Card

- [ ] OGP画像生成（または固定画像設定）
- [ ] 各ページのOG設定
- [ ] Twitter Card設定

### 4.3 構造化データ (JSON-LD)

- [ ] JSON-LDコンポーネント (`src/components/seo/JsonLd.tsx`)
- [ ] WebSiteスキーマ（トップページ）
- [ ] BlogPostingスキーマ（記事ページ）
- [ ] BreadcrumbListスキーマ
- [ ] Personスキーマ（プロフィール）

### 4.4 パンくずリスト

- [ ] パンくずコンポーネント (`src/components/seo/Breadcrumb.tsx`)
- [ ] 各ページへの設置

### 4.5 サイトマップ・robots.txt

- [ ] サイトマップ動的生成 (`src/app/sitemap.ts`)
- [ ] robots.txt生成 (`src/app/robots.ts`)

### 4.6 RSSフィード

- [ ] RSSフィード生成 (`src/app/feed.xml/route.ts`)

### 4.7 canonical URL

- [ ] 各ページにcanonical URL設定

---

## Phase 5: パフォーマンス最適化

### 5.1 画像最適化

- [ ] next/image使用徹底
- [ ] 適切なサイズ・フォーマット設定
- [ ] プレースホルダー（blur）設定

### 5.2 静的生成・キャッシュ

- [ ] 静的ページ生成設定
- [ ] ISR設定（revalidate）
- [ ] generateStaticParams実装

### 5.3 Core Web Vitals対策

- [ ] LCP最適化（ファーストビュー画像優先読み込み）
- [ ] CLS対策（画像サイズ明示、フォントディスプレイ設定）
- [ ] FID対策（JSバンドル最適化）

### 5.4 Lighthouse監査

- [ ] Performance 90以上
- [ ] Accessibility 90以上
- [ ] Best Practices 90以上
- [ ] SEO 90以上

---

## Phase 6: エラーハンドリング・仕上げ

### 6.1 エラーページ

- [ ] 404ページ (`src/app/not-found.tsx`)
- [ ] エラーページ (`src/app/error.tsx`)
- [ ] グローバルエラーページ (`src/app/global-error.tsx`)

### 6.2 ローディング

- [ ] ローディングUI (`src/app/loading.tsx`)
- [ ] Suspense境界設定

### 6.3 アクセシビリティ

- [ ] セマンティックHTML確認
- [ ] ARIAラベル設定
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
| Phase 1: 環境構築 | 13 | 0 | 0% |
| Phase 2: レイアウト | 15 | 0 | 0% |
| Phase 3: ブログ機能 | 18 | 0 | 0% |
| Phase 4: SEO対策 | 15 | 0 | 0% |
| Phase 5: パフォーマンス | 10 | 0 | 0% |
| Phase 6: エラーハンドリング | 8 | 0 | 0% |
| Phase 7: デプロイ | 10 | 0 | 0% |
| **合計** | **101** | **12** | **12%** |
