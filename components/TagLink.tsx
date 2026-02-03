import Link from "next/link";

export default function TagLink({
  tag,
  href,
  active = false,
  count,
  prefixHash = true,
}: {
  tag: string;
  href: string;
  active?: boolean;
  count?: number;
  prefixHash?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "bg-neutral-900 text-white border-neutral-900"
          : "hover:bg-neutral-50",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span>{prefixHash ? `#${tag}` : tag}</span>
      {typeof count === "number" ? (
        <span className={active ? "text-white/70" : "text-neutral-500"}>
          ({count})
        </span>
      ) : null}
    </Link>
  );
}
