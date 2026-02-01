import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: { canonical: `/posts/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">{post.frontmatter.title}</h1>
          <div className="text-sm text-neutral-600">
            <span>投稿日: {post.frontmatter.publishedAt}</span>
            {" · "}
            <span>更新日: {post.frontmatter.updatedAt}</span>
          </div>
        </header>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}
