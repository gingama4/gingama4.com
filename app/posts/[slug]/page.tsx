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
    const title = post.frontmatter.title;
    const description = post.frontmatter.description ?? "gingama4.com の記事";
    const url = `https://gingama4.com/posts/${slug}`;
    const image = "/og.png";

    return {
      title,
      description,
      alternates: { canonical: `/posts/${slug}` },
      openGraph: {
        title,
        description,
        url,
        siteName: "gingama4.com",
        type: "article",
        publishedTime: post.frontmatter.publishedAt,
        modifiedTime: post.frontmatter.updatedAt,
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
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
