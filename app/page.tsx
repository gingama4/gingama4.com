import Link from "next/link";

const links = [
  { href: "https://github.com/gingama4", label: "GitHub" },
  { href: "https://x.com/gingama4", label: "X (@gingama4)" },
] as const;

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">gingama4.com</h1>
        <p className="text-neutral-700">作ったものと、学んだことを置いていく個人サイト。</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">Works</h2>
          <Link href="/works" className="text-sm underline underline-offset-4">
            もっと見る
          </Link>
        </div>
        <p className="text-neutral-700">準備中。制作物を追加していく予定。</p>
      </section>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">Blog</h2>
          <Link href="/posts" className="text-sm underline underline-offset-4">
            もっと見る
          </Link>
        </div>
        <p className="text-neutral-700">準備中。開発ログや学びをメモしていく。</p>
      </section>
    </div>
  );
}
