import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllMaterialSlugs, getMaterialBySlug, getPublishedMaterials } from "@/lib/content/loader";
import { siteConfig } from "@/config/site";
import ContentRenderer from "@/components/ContentRenderer";
import CtaTelegram from "@/components/CtaTelegram";
import Reveal from "@/components/Reveal";
import { IconChevronLeft, IconClock } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllMaterialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    return {
      title: "Материал не найден",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = siteConfig.siteUrl;
  const materialUrl = `${siteUrl}/materials/${material.slug}`;
  const ogImage = material.seo.ogImage || material.coverImage;

  return {
    title: material.seo.title,
    description: material.seo.description,
    alternates: {
      canonical: materialUrl,
    },
    openGraph: {
      title: material.seo.title,
      description: material.seo.description,
      type: "article",
      url: materialUrl,
      publishedTime: material.publishedAt,
      modifiedTime: material.updatedAt,
      images: [{ url: ogImage, alt: material.coverAlt }],
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: material.seo.title,
      description: material.seo.description,
      images: [ogImage],
    },
  };
}

export default async function MaterialPage({ params }: PageProps) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  const allMaterials = getPublishedMaterials();
  const currentIndex = allMaterials.findIndex((m) => m.slug === material.slug);
  const nextMaterial = allMaterials[(currentIndex + 1) % allMaterials.length];
  const showNext = nextMaterial && nextMaterial.slug !== material.slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: material.title,
    description: material.seo.description,
    image: material.seo.ogImage || material.coverImage,
    datePublished: material.publishedAt,
    dateModified: material.updatedAt || material.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/materials/${material.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container-x max-w-3xl pb-4 pt-8 sm:pt-12">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <IconChevronLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Все материалы
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="pill border border-lime-300/70 bg-lime-100 px-3.5 py-2 text-lime-700">
              {material.formatLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              <IconClock className="size-3.5" />
              {new Date(`${material.publishedAt}T00:00:00`).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(1.55rem,4.6vw,2.6rem)] font-semibold leading-[1.16] tracking-[-0.015em]">
            {material.title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            {material.summary}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <figure className="mt-10 rounded-[26px] border border-line bg-paper p-2.5 shadow-[0_24px_56px_-34px_rgba(38,40,31,0.4)]">
            <img
              src={material.coverImage}
              alt={material.coverAlt}
              className="aspect-[16/9] w-full rounded-[18px] object-cover"
            />
          </figure>
        </Reveal>

        <div className="mt-14">
          <ContentRenderer blocks={material.blocks} materialSlug={material.slug} />
        </div>

        <div className="mt-14">
          <CtaTelegram />
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <IconChevronLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Все материалы
            </Link>
            {showNext && (
              <Link
                href={`/materials/${nextMaterial.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-400 hover:shadow-[0_18px_40px_-26px_rgba(38,40,31,0.45)]"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                    Дальше в базе
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold group-hover:text-lime-700">
                    {nextMaterial.title}
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-milk text-ink transition-colors group-hover:border-lime-500 group-hover:bg-lime-100">
                  <svg className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4.5 12h15M13.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
