import { client } from './client';
import type {
  Blog,
  BlogListResponse,
  Category,
  CategoryListResponse,
  Profile,
  Tag,
  TagListResponse,
} from './types';

const BLOG_PER_PAGE = 10;

const emptyBlogResponse: BlogListResponse = { contents: [], totalCount: 0, offset: 0, limit: 0 };
const emptyCategoryResponse: CategoryListResponse = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
};
const emptyTagResponse: TagListResponse = { contents: [], totalCount: 0, offset: 0, limit: 0 };

// ブログ記事一覧を取得
export async function getBlogs(options?: {
  offset?: number;
  limit?: number;
  filters?: string;
}): Promise<BlogListResponse> {
  const { offset = 0, limit = BLOG_PER_PAGE, filters } = options || {};

  try {
    return await client.get({
      endpoint: 'blogs',
      queries: {
        offset,
        limit,
        filters,
        orders: '-publishedAt',
      },
    });
  } catch {
    console.error('Failed to fetch blogs');
    return emptyBlogResponse;
  }
}

// ブログ記事をslugで取得
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await client.get<BlogListResponse>({
      endpoint: 'blogs',
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    console.error(`Failed to fetch blog with slug: ${slug}`);
    return null;
  }
}

// ブログ記事をIDで取得
export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    return await client.get({
      endpoint: 'blogs',
      contentId: id,
    });
  } catch {
    console.error(`Failed to fetch blog with id: ${id}`);
    return null;
  }
}

// 全ブログ記事のslugを取得（静的生成用）
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const response = await client.get<BlogListResponse>({
      endpoint: 'blogs',
      queries: {
        fields: 'slug',
        limit: 100,
      },
    });

    return response.contents.map((blog) => blog.slug);
  } catch {
    console.error('Failed to fetch blog slugs');
    return [];
  }
}

// カテゴリー別の記事一覧を取得
export async function getBlogsByCategory(
  categoryId: string,
  options?: { offset?: number; limit?: number }
): Promise<BlogListResponse> {
  const { offset = 0, limit = BLOG_PER_PAGE } = options || {};

  try {
    return await client.get({
      endpoint: 'blogs',
      queries: {
        offset,
        limit,
        filters: `category[equals]${categoryId}`,
        orders: '-publishedAt',
      },
    });
  } catch {
    console.error(`Failed to fetch blogs for category: ${categoryId}`);
    return emptyBlogResponse;
  }
}

// タグ別の記事一覧を取得
export async function getBlogsByTag(
  tagId: string,
  options?: { offset?: number; limit?: number }
): Promise<BlogListResponse> {
  const { offset = 0, limit = BLOG_PER_PAGE } = options || {};

  try {
    return await client.get({
      endpoint: 'blogs',
      queries: {
        offset,
        limit,
        filters: `tags[contains]${tagId}`,
        orders: '-publishedAt',
      },
    });
  } catch {
    console.error(`Failed to fetch blogs for tag: ${tagId}`);
    return emptyBlogResponse;
  }
}

// カテゴリー一覧を取得
export async function getCategories(): Promise<CategoryListResponse> {
  try {
    return await client.get({
      endpoint: 'categories',
      queries: {
        limit: 100,
      },
    });
  } catch {
    console.error('Failed to fetch categories');
    return emptyCategoryResponse;
  }
}

// カテゴリーをslugで取得
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await client.get<CategoryListResponse>({
      endpoint: 'categories',
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    console.error(`Failed to fetch category with slug: ${slug}`);
    return null;
  }
}

// タグ一覧を取得
export async function getTags(): Promise<TagListResponse> {
  try {
    return await client.get({
      endpoint: 'tags',
      queries: {
        limit: 100,
      },
    });
  } catch {
    console.error('Failed to fetch tags');
    return emptyTagResponse;
  }
}

// タグをslugで取得
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await client.get<TagListResponse>({
      endpoint: 'tags',
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return response.contents[0] || null;
  } catch {
    console.error(`Failed to fetch tag with slug: ${slug}`);
    return null;
  }
}

// プロフィールを取得
export async function getProfile(): Promise<Profile | null> {
  try {
    return await client.get({
      endpoint: 'profile',
    });
  } catch {
    console.error('Failed to fetch profile');
    return null;
  }
}

// 関連記事を取得（同じカテゴリーの記事）
export async function getRelatedBlogs(
  currentBlogId: string,
  categoryId: string,
  limit: number = 3
): Promise<Blog[]> {
  try {
    const response = await client.get<BlogListResponse>({
      endpoint: 'blogs',
      queries: {
        filters: `category[equals]${categoryId}[and]id[not_equals]${currentBlogId}`,
        limit,
        orders: '-publishedAt',
      },
    });

    return response.contents;
  } catch {
    console.error('Failed to fetch related blogs');
    return [];
  }
}
