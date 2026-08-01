import type { Metadata } from "next";
import { Golos_Text, JetBrains_Mono, Unbounded } from "next/font/google";
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
    default: "Вайб-кодинг с нуля — 5 промптов для первого проекта",
    template: "%s — Вайб-кодинг с нуля",
  },
  description: siteConfig.siteDescription,
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.siteName,
    title: "Вайб-кодинг с нуля — 5 промптов для первого проекта",
    description: siteConfig.siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Вайб-кодинг с нуля — 5 промптов для первого проекта",
    description: siteConfig.siteDescription,
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
  const { analytics } = siteConfig;

  return (
    <html lang="ru" className={`${golos.variable} ${unbounded.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="theme-color" content="#F6F6F0" />
        {analytics.umami.enabled && analytics.umami.websiteId && analytics.umami.src && (
          <script
            defer
            src={analytics.umami.src}
            data-website-id={analytics.umami.websiteId}
            data-do-not-track="true"
          />
        )}
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-xl bg-moss-950 px-4 py-2.5 text-sm font-medium text-paper transition-transform focus:translate-y-0"
        >
          Перейти к материалам
        </a>
        <div className="site-shell flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
