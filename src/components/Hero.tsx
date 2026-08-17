import Image from "next/image";
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import Reveal from "./Reveal";
import TrackedCourseLink from "./TrackedCourseLink";

export default function Hero() {
  const { author } = siteConfig;

  return (
    <section className="relative overflow-hidden pb-10 pt-8 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20">
      <div className="dot-grid pointer-events-none absolute -right-16 top-10 hidden size-72 opacity-70 lg:block" style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }} aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-lime-200/50 blur-3xl" aria-hidden />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16">
        <Reveal className="relative z-10 max-w-2xl">
          <p className="pill w-fit border border-lime-300/70 bg-lime-100 px-3.5 py-2 text-lime-700">
            <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
            {pageCopy.hero.eyebrow}
          </p>

          <h1 data-hero-headline="true" className="mt-5 font-display text-[clamp(2rem,7vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
            Стартовый набор
            <span className="mt-1 block text-lime-700">для вайб-кодинга</span>
          </h1>

          <p className="mt-5 max-w-xl text-[1.05rem] font-medium leading-relaxed text-ink-soft sm:text-[1.2rem]">
            {pageCopy.hero.lead}
          </p>

          <figure data-hero-author="true" className="mt-6 flex items-center gap-3 lg:hidden">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line-strong bg-paper shadow-[0_12px_26px_-18px_rgba(38,40,31,0.5)]">
              <Image src={author.photo} alt={author.photoAlt} fill priority sizes="48px" className="object-cover object-center" />
            </div>
            <figcaption className="min-w-0">
              <span className="block text-sm font-semibold leading-tight text-ink">{author.name}</span>
              <span className="mt-1 block text-xs leading-snug text-ink-soft">{author.role}</span>
            </figcaption>
          </figure>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#projects" className="btn-primary min-h-12 w-full px-6 text-[15px] sm:w-fit">
              {pageCopy.hero.primaryAction}
              <IconArrowRight className="size-4" />
            </a>
            <TrackedCourseLink placement="hero" className="btn-ghost min-h-12 w-full px-6 text-[15px] sm:w-fit">
              {pageCopy.hero.courseAction}
              <IconArrowUpRight className="size-[18px]" />
            </TrackedCourseLink>
          </div>

          <div className="mt-6 flex items-center gap-2.5 border-t border-line pt-4 text-[13px] leading-snug text-ink-soft">
            <span className="font-semibold text-lime-600" aria-hidden>✓</span>
            <p>{pageCopy.hero.mobile.meta}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto hidden w-full max-w-[560px] lg:block lg:max-w-none">
          <div className="anim-spin-slow pointer-events-none absolute -right-7 -top-9 size-44 rounded-full border border-dashed border-lime-500/60" aria-hidden />
          <figure data-hero-photo="true" className="relative rotate-[1.2deg] rounded-[34px] border border-line bg-paper p-3 pb-12 shadow-[0_32px_76px_-38px_rgba(38,40,31,0.44)] transition-transform duration-500 hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-milk">
              <Image
                src={author.photo}
                alt={author.photoAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 560px, 46vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-8 flex min-w-[310px] items-center gap-3.5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_18px_44px_-22px_rgba(38,40,31,0.35)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-200 font-display text-sm font-semibold text-lime-700">
                {author.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-ink">{author.name}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{author.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
