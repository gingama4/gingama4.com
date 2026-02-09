"use client";

import TagLink from "@/components/TagLink";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[];
};

export default function PostsFilterClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredPosts = activeTag
    ? posts.filter((p) => (p.tags ?? []).includes(activeTag))
    : posts;

  return (
    <section className="space-y-2">
      {activeTag ? (
        <p className="text-sm text-neutral-600">
          フィルタ: <span className="font-medium">{activeTag}</span> (
          {filteredPosts.length}件)
        </p>
      ) : (
        <p className="text-sm text-neutral-600">{filteredPosts.length}件</p>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-sm text-neutral-700">該当する記事がありません。</p>
      ) : (
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li key={post.slug} className="space-y-1">
              <Link
                href={`/posts/${post.slug}`}
                className="text-lg font-medium hover:underline"
              >
                {post.title}
              </Link>

              <div className="text-sm text-neutral-600">
                <span>投稿日: {post.publishedAt}</span>
                {" ・ "}
                <span>更新日: {post.updatedAt}</span>
              </div>

              {(post.tags?.length ?? 0) > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-600">
                  {post.tags!.map((t) => (
                    <TagLink
                      key={t}
                      tag={t}
                      href={`/posts?tag=${encodeURIComponent(t)}`}
                      active={activeTag === t}
                      size="sm"
                    />
                  ))}
                </div>
              ) : null}

              {post.description ? (
                <p className="text-sm text-neutral-700">{post.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
