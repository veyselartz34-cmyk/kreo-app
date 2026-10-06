import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kreo – Dijital Ürünlerini Tek Vitrinden Sat",
  description:
    "Türk içerik üreticileri için dijital ürün, danışmanlık ve abonelik satış platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${GeistSans.className} bg-[var(--bg)] text-[var(--fg)] antialiased selection:bg-brand-yellow/30`}
      >
        {children}
      </body>
    </html>
  );
}
