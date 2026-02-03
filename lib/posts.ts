import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * 記事のフロントマター（メタデータ）の型定義
 */
export type PostFrontmatter = {
  /** 記事のタイトル */
  title: string;
  /** 公開日（YYYY-MM-DD形式） */
  publishedAt: string;
  /** 更新日（YYYY-MM-DD形式） */
  updatedAt: string;
  /** 記事の説明（任意） */
  description?: string;
  /** タグのリスト（任意） */
  tags?: string[];
};

/**
 * 記事一覧に表示する記事の型定義
 */
export type PostListItem = PostFrontmatter & {
  /** 記事のスラッグ（URLパス） */
  slug: string;
};

/**
 * 日付が YYYY-MM-DD 形式であることを検証する
 *
 * @param date - 検証する日付文字列
 * @param fieldName - フィールド名（エラーメッセージ用）
 * @param slug - 記事のスラッグ（エラーメッセージ用）
 * @throws {Error} 日付形式が不正な場合
 */
function assertValidDate(date: string, fieldName: string, slug: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `[posts ]Invalid ${fieldName} format in "${slug}". Expected YYYY-MM-DD, got: ${date}`,
    );
  }
}

/**
 * フロントマターを検証して PostFrontmatter 型に変換する
 *
 * @param fm - gray-matter から取得した部分的なフロントマター
 * @param slug - 記事のスラッグ（エラーメッセージ用）
 * @returns 検証済みのフロントマター
 * @throws {Error} 必須フィールドが不足している場合
 */
function getPostFrontmatter(
  fm: Partial<PostFrontmatter>,
  slug: string,
): PostFrontmatter {
  if (!fm.title) throw new Error(`[posts] Missing title in "${slug}"`);
  if (!fm.publishedAt)
    throw new Error(`[posts] Missing publishedAt in "${slug}"`);
  if (!fm.updatedAt) throw new Error(`[posts] Missing updatedAt in "${slug}"`);

  assertValidDate(fm.publishedAt, "publishedAt", slug);
  assertValidDate(fm.updatedAt, "updatedAt", slug);

  return {
    title: fm.title,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    description: fm.description,
    tags: fm.tags ?? [],
  };
}
/**
 * posts ディレクトリから全記事のスラッグを取得する
 *
 * @returns 記事のスラッグの配列（.md 拡張子を除いたファイル名）
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .filter((name) => !name.startsWith("_"))
    .map((name) => name.replace(/\.md$/, ""));
}

/**
 * 全記事の情報を取得し、公開日の新しい順にソートして返す
 *
 * @returns 記事一覧（公開日の降順）
 */
export function getAllPosts(): PostListItem[] {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const fm = data as Partial<PostFrontmatter>;

    const frontmatter = getPostFrontmatter(fm, slug);

    return { ...frontmatter, slug };
  });

  // 新しい順にソート
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return posts;
}

/**
 * 指定されたスラッグの記事の詳細情報を取得する
 *
 * @param slug - 取得する記事のスラッグ
 * @returns 記事のスラッグ、フロントマター、HTML化されたコンテンツ
 */
export async function getPostBySlug(slug: string): Promise<{
  slug: string;
  frontmatter: PostFrontmatter;
  contentHtml: string;
}> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const fm = data as Partial<PostFrontmatter>;

  const frontmatter = getPostFrontmatter(fm, slug);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    frontmatter: frontmatter,
    contentHtml,
  };
}

/**
 * すべてのタグとその出現回数を取得する
 *
 * @returns タグとその出現回数の配列
 */
export function getAllTags(): Array<{ tag: string; count: number }> {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag, "ja"));
}
