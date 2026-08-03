import Image from "next/image";
import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import Reveal from "./Reveal";

export default function Hero() {
  const { author } = siteConfig;
  const [mobileTitleFirstLine, mobileTitleEnding] = pageCopy.hero.title.split(" с ");

  return (
    <section className="relative overflow-hidden pb-8 pt-8 sm:pb-14 sm:pt-16 lg:pb-20 lg:pt-20">
      <div
        className="dot-grid pointer-events-none absolute -right-16 top-10 hidden size-72 opacity-70 lg:block"
        style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-lime-200/50 blur-3xl" aria-hidden />

      <div className="container-x sm:hidden">
        <Reveal>
          <p className="pill w-fit border border-lime-300/70 bg-lime-100 px-3 py-2 text-[0.65rem] text-lime-700">
            <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
            {pageCopy.hero.mobile.eyebrow}
          </p>

          <h1
            data-mobile-headline="true"
            className="mt-5 font-display text-[clamp(1.7rem,8vw,2rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink"
          >
            <span className="block">{mobileTitleFirstLine}</span>
            <span className="block">с {mobileTitleEnding}</span>
          </h1>

          <p className="mt-4 text-[1rem] leading-[1.55] text-ink-soft">
            {pageCopy.hero.lead}
          </p>

          <figure data-mobile-author="true" className="mobile-author mt-5 flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line-strong bg-paper shadow-[0_12px_26px_-18px_rgba(38,40,31,0.5)]">
              <Image
                src={author.photo}
                alt={author.photoAlt}
                fill
                priority
                sizes="56px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="min-w-0">
              <span className="block text-sm font-semibold leading-tight text-ink">{author.name}</span>
              <span className="mt-1 block text-xs leading-snug text-ink-soft">{author.role}</span>
            </figcaption>
          </figure>

          <div className="mt-5 flex items-center gap-2.5 border-t border-line pt-4 text-[13px] leading-snug text-ink-soft">
            <span className="font-semibold text-lime-600" aria-hidden>✓</span>
            <p>{pageCopy.hero.mobile.meta}</p>
          </div>
        </Reveal>
      </div>

      <div className="container-x hidden items-center gap-12 sm:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal className="max-w-2xl">
          <p className="pill w-fit border border-lime-300/70 bg-lime-100 px-4 py-2 text-lime-700">
            <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
            {pageCopy.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.65rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {pageCopy.hero.title}
          </h1>
          <p className="mt-5 font-display text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-snug text-ink-soft">
            {pageCopy.hero.lead}
          </p>
          <div className="mt-6 space-y-3 text-[15.5px] leading-relaxed text-ink-soft sm:text-base">
            {pageCopy.hero.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="info-note mt-7 flex items-start gap-3 rounded-2xl border border-line bg-paper/75 p-4 shadow-[0_16px_38px_-32px_rgba(38,40,31,0.4)]">
            <span aria-hidden className="mt-0.5 text-lg">⏱️</span>
            <p className="text-sm leading-relaxed text-ink-soft">{pageCopy.hero.note}</p>
          </div>
        </Reveal>

        <Reveal delay={140} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="anim-spin-slow pointer-events-none absolute -right-7 -top-9 size-36 rounded-full border border-dashed border-lime-500/60 sm:size-44" aria-hidden />
          <figure className="relative rotate-[1.4deg] rounded-[30px] border border-line bg-paper p-3 pb-11 shadow-[0_30px_70px_-35px_rgba(38,40,31,0.4)] transition-transform duration-500 hover:rotate-0 sm:pb-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
              <Image
                src={author.photo}
                alt={author.photoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 448px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <figcaption className="anim-float absolute -bottom-6 left-4 right-4 flex items-center gap-3.5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_18px_44px_-22px_rgba(38,40,31,0.35)] sm:left-8 sm:right-auto sm:min-w-[300px]">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-200 font-display text-sm font-semibold text-lime-700">
                {author.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold">{author.name}</span>
                <span className="mt-0.5 block truncate text-xs text-ink-soft">{author.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
