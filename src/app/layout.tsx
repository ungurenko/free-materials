import type { Metadata } from "next";
import { Golos_Text, JetBrains_Mono, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const golos = Golos_Text({
  subsets: ["cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Стартовый набор для вайб-кодинга — 10 готовых промптов",
    template: "%s — Стартовый набор для вайб-кодинга",
  },
  description: siteConfig.siteDescription,
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.author.name, url: siteConfig.siteUrl }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.siteName,
    title: "Стартовый набор для вайб-кодинга — 10 готовых промптов",
    description: siteConfig.siteDescription,
    url: "/",
    images: [
      {
        url: siteConfig.socialPreviewImage,
        width: 1200,
        height: 630,
        alt: siteConfig.socialPreviewAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Стартовый набор для вайб-кодинга — 10 готовых промптов",
    description: siteConfig.siteDescription,
    images: [
      {
        url: siteConfig.socialPreviewImage,
        alt: siteConfig.socialPreviewAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${golos.variable} ${unbounded.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="theme-color" content="#F6F6F0" />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-xl bg-moss-950 px-4 py-2.5 text-sm font-medium text-paper transition-transform focus:translate-y-0"
        >
          Перейти к материалам
        </a>
        <div className="site-shell flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
