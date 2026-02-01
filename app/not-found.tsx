import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">ページが見つかりません</h1>
      <p className="text-neutral-700">
        URLが間違っているか、ページが移動した可能性があります。
      </p>
      <Link href="/" className="underline underline-offset-4">
        トップへ戻る
      </Link>
    </div>
  );
}
