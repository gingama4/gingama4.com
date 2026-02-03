import { getAllPosts, getAllTags } from "@/lib/posts";
import PostsFilterClient from "./PostsFilterClient";
import TagSidebar from "./TagSidebar";
import { Suspense } from "react";

export const metadata = {
  title: "Blog",
};

export default function PostPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-neutral-700">学んだことや開発ログ。</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <Suspense fallback={<div className="text-neutral-700">Loading...</div>}>
          <PostsFilterClient posts={posts} />
        </Suspense>

        <Suspense fallback={<div className="text-neutral-700">Loading...</div>}>
          <TagSidebar tags={tags} />
        </Suspense>
      </div>
    </div>
  );
}
