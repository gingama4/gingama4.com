"use client";

import TagLink from "@/components/TagLink";

export default function PostTagList({ tags }: { tags: string[] | undefined }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagLink
          key={tag}
          tag={tag}
          href={`/posts?tag=${encodeURIComponent(tag)}`}
        />
      ))}
    </div>
  );
}
