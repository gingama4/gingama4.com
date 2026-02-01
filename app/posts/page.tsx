import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

export default function PostPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-neutral-700">学んだことや開発ログ。</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-700">記事はまだありません。</p>
      ): (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="space-y-1">
              <Link
                href={`/posts/${post.slug}`}
                className="text-lg font-medium hover:underline"
              >
                {post.title}
              </Link>
              <div className="text-sm text-neutral-600">
                <span>投稿日: {post.publishedAt}</span>
                { " ・ " }
                <span>更新日: {post.updatedAt}</span>
              </div>
              {post.description ? (
                <p className="text-sm text-neutral-700">{post.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
