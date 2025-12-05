import type { MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

// カテゴリー
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
} & MicroCMSDate;

// タグ
export type Tag = {
  id: string;
  name: string;
  slug: string;
} & MicroCMSDate;

// ブログ記事
// 更新日(updatedAt)・作成日(createdAt)はmicroCMSデフォルトフィールド(MicroCMSDate)を使用
// publishedAtはMicroCMSDateでは省略可能だが、公開済み記事では必ず存在するため必須として定義
export type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
  tags?: Tag[];
  publishedAt: string;
} & MicroCMSDate;

// プロフィール
export type Profile = {
  id: string;
  name: string;
  bio: string;
  about?: string;
  avatar?: MicroCMSImage;
} & MicroCMSDate;

// 記事一覧のレスポンス
export type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

// カテゴリー一覧のレスポンス
export type CategoryListResponse = {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
};

// タグ一覧のレスポンス
export type TagListResponse = {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
};
