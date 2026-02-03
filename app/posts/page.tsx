import { getAllPosts, getAllTags } from "@/lib/posts";
import Link from "next/link";
import PostsFilterClient from "./PostsFilterClient";
import { Suspense } from "react";

export const metadata = {
  title: "Blog",
};

export default function PostPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-neutral-700">学んだことや開発ログ。</p>
      </header>

      <Suspense fallback={<div className="text-neutral-700">Loading...</div>}>
        <PostsFilterClient posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
