"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[];
};

export default function PostsFilterClient({
  posts,
  tags,
}: {
  posts: Post[];
  tags: Array<{ tag: string; count: number }>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredPosts = activeTag
    ? posts.filter((p) => (p.tags ?? []).includes(activeTag))
    : posts;

  const makeHref = (tag: string | null) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (!tag) sp.delete("tag");
    else sp.set("tag", tag);
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return(
    <div className="space-y-6">
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-neutral-700">タグ</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href={makeHref(null)}
            className={[
              "rounded-full border px-3 py-1 text-sm",
              activeTag ? "hover:bg-neutral-50" : "bg-neutral-900 text-white",
            ].join(" ")}
          >
            すべて
          </Link>

          {tags.map(({ tag, count }) => {
            const isActive = activeTag === tag;
            return (
              <Link
                key={tag}
                href={makeHref(tag)}
                className={[
                  "rounded-full border px-3 py-1 text-sm",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-50",
                ].join(" ")}
              >
                #{tag} <span className="opacity-70">({count})</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        {activeTag ? (
          <p className="text-sm text-neutral-600">
            フィルタ: <span className="font-medium">{activeTag}</span> ({filteredPosts.length}件)
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
                    { " ・ " }
                    <span>更新日: {post.updatedAt}</span>
                  </div>

                  {(post.tags?.length ?? 0) > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-600">
                      {post.tags!.map((t) => (
                        <Link
                          key={t}
                          href={makeHref(t)}
                          className={[
                            "rounded-full border px-2 py-0.5",
                            activeTag === t
                              ? "bg-neutral-900 text-white"
                              : "hover:bg-neutral-50",
                          ].join(" ")}
                        >
                          #{t}
                        </Link>
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
    </div>
  );
}
