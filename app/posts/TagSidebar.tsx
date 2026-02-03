"use client";

import { usePathname, useSearchParams } from "next/navigation";
import TagLink from "@/components/TagLink";

export default function TagSidebar({
  tags,
}: {
  tags: Array<{ tag: string; count: number }>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const makeHref = (tag: string | null) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (!tag) sp.delete("tag");
    else sp.set("tag", tag);
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <aside className="space-y-2">
      <h2 className="text-sm font-semibold text-neutral-700">タグ</h2>

      <div className="flex flex-wrap gap-2">
        <TagLink tag="すべて" href={makeHref(null)} active={!activeTag} prefixHash={false} />
        {tags.map(({ tag, count }) => (
          <TagLink
            key={tag}
            tag={tag}
            href={makeHref(tag)}
            active={activeTag === tag}
            count={count}
          />
        ))}
      </div>
    </aside>
  );
}
