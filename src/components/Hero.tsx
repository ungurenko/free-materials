import Image from "next/image";
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import HeroOrbit from "./hero/HeroOrbit";
import Reveal from "./Reveal";
import TrackedCourseLink from "./TrackedCourseLink";

export default function Hero() {
  const { author } = siteConfig;

  return (
    <section className="relative overflow-hidden pb-4 pt-8 sm:pb-6 sm:pt-14 lg:pb-8 lg:pt-20">
      <div className="dot-grid pointer-events-none absolute -right-16 top-10 hidden size-72 opacity-70 lg:block" style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }} aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-lime-200/50 blur-3xl" aria-hidden />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16">
        <Reveal className="relative z-10 min-w-0 max-w-2xl">
          <p className="pill w-fit border border-lime-300/70 bg-lime-100 px-3.5 py-2 text-lime-700">
            <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
            {pageCopy.hero.eyebrow}
          </p>

          <h1 data-hero-headline="true" className="mt-5 min-w-0 break-words font-display text-[clamp(2rem,7vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink lg:text-[clamp(2.5rem,4.9vw,3.6rem)]">
            <span className="block">Стартовый</span>{" "}
            <span className="block">
              набор <span className="text-lime-700">для</span>
            </span>{" "}
            <span className="mt-1 block text-lime-700">
              <span className="relative inline-block whitespace-nowrap">
                вайб-кодинга
                <svg viewBox="0 0 300 16" preserveAspectRatio="none" className="hero-underline pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-lime-500" aria-hidden>
                  <path d="M4 11 C 40 3, 70 3, 100 9 S 160 15, 196 8 S 262 2, 296 7" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </span>
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
            <a href="#projects" className="btn-primary h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center text-[0.9375rem] sm:w-fit sm:whitespace-nowrap">
              {pageCopy.hero.primaryAction}
              <IconArrowRight className="size-4 shrink-0 rtl:-scale-x-100" />
            </a>
            <TrackedCourseLink placement="hero" className="btn-ghost h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center text-[0.9375rem] sm:w-fit sm:whitespace-nowrap">
              {pageCopy.hero.courseAction}
              <IconArrowUpRight className="size-[1.125rem] shrink-0 rtl:-scale-x-100" />
            </TrackedCourseLink>
          </div>

          <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-4 text-[0.8125rem] leading-snug text-ink-soft">
            <span className="font-semibold text-lime-600" aria-hidden>✓</span>
            <p>{pageCopy.hero.mobile.meta}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto hidden w-full max-w-[560px] lg:block lg:max-w-none">
          <HeroOrbit>
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
            <figcaption className="absolute -bottom-5 start-8 end-8 flex min-w-0 items-center gap-3.5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_18px_44px_-22px_rgba(38,40,31,0.35)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-200 font-display text-sm font-semibold text-on-accent">
                {author.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold text-ink">{author.name}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{author.role}</span>
              </span>
            </figcaption>
          </figure>
          </HeroOrbit>
        </Reveal>
      </div>
    </section>
  );
}
