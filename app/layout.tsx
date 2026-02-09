import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gingama4.com"),
  title: {
    default: "gingama4.com",
    template: "%s | gingama4.com",
  },
  description: "作ったものと、学んだことを置いていく個人サイト。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "gingama4.com",
    description: "作ったものと、学んだことを置いていく個人サイト。",
    url: "https://gingama4.com",
    siteName: "gingama4.com",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/posts", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh">
          <header className="border-b">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
              <Link href="/" className="font-semibold">
                gingama4.com
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>

          <footer className="border-t">
            <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-neutral-600">
              <p>© {new Date().getFullYear()} gingama4.com</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
