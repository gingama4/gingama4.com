import type { CollectionEntry } from "astro:content";

export type PostFrontmatter = CollectionEntry<"blog">["data"];
