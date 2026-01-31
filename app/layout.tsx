import type { Metadata } from "next";
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
    images: ["/og.png"]
  },
};

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
        {children}
      </body>
    </html>
  );
}
