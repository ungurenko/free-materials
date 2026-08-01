import { siteConfig } from "@/config/site";
import { leadmagnetHero } from "@/content/leadmagnet";
import { IconArrowRight, IconGift, IconInstagram, IconTelegram, IconYoutube } from "./icons";
import Reveal from "./Reveal";

export default function Hero() {
  const { author, socials } = siteConfig;
  const { title, subtitle, promise, callout } = leadmagnetHero;

  return (
    <section className="relative overflow-hidden">
      <div
        className="dot-grid pointer-events-none absolute -right-16 top-10 hidden size-72 opacity-70 lg:block"
        style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-lime-200/50 blur-3xl"
        aria-hidden
      />

      <div className="container-x grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="relative max-w-xl">
          <Reveal>
            <p className="pill border border-lime-300/70 bg-lime-100 px-4 py-2 text-lime-700">
              <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
              Лидмагнит · 5 промптов
            </p>

            <h1 className="mt-6 font-display text-[clamp(1.85rem,5vw,3.3rem)] font-semibold leading-[1.13] tracking-[-0.015em] text-ink">
              {title}
            </h1>

            <p className="mt-5 font-display text-[clamp(1.05rem,2vw,1.35rem)] font-medium leading-snug text-ink-soft">
              {subtitle}
            </p>

            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              {promise}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 border-l-2 border-lime-500 pl-4">
              <p className="text-[15px] leading-relaxed text-ink-soft">{callout}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="btn-primary h-12 flex-1 basis-[170px] px-6 text-[15px]"
              >
                Перейти к выбору проекта
                <IconArrowRight className="size-5" />
              </a>
              <a
                href={socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost h-12 flex-1 basis-[150px] px-5 text-[15px]"
              >
                <IconTelegram className="size-5" />
                Telegram
              </a>
              <a
                href={socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost h-12 flex-1 basis-[150px] px-5 text-[15px]"
              >
                <IconYoutube className="size-5" />
                YouTube
              </a>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-ink-faint">
              <span className="pill border border-line bg-paper px-2.5 py-1 text-[10.5px] text-ink-soft">
                <span className="size-1 rounded-full bg-lime-500" aria-hidden />
                Qwen
              </span>
              <span className="pill border border-line bg-paper px-2.5 py-1 text-[10.5px] text-ink-soft">
                <span className="size-1 rounded-full bg-lime-500" aria-hidden />
                Google AI Studio
              </span>
              <span className="pill border border-line bg-paper px-2.5 py-1 text-[10.5px] text-ink-soft">
                <span className="size-1 rounded-full bg-lime-500" aria-hidden />
                GLM в Z.ai
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="anim-spin-slow pointer-events-none absolute -right-6 -top-10 size-36 rounded-full border border-dashed border-lime-500/60 sm:-right-10 sm:size-44"
            aria-hidden
          />
          <div
            className="dot-grid pointer-events-none absolute -bottom-8 -left-8 hidden size-40 sm:block"
            style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }}
            aria-hidden
          />

          <figure className="group relative rotate-[1.4deg] rounded-[30px] border border-line bg-paper p-3 shadow-[0_30px_70px_-35px_rgba(38,40,31,0.4)] transition-transform duration-500 hover:rotate-0">
            <img
              src={author.photo}
              alt={author.photoAlt}
              className="aspect-[4/5] w-full rounded-[22px] object-cover"
            />
            <span className="pill absolute right-6 top-6 -rotate-3 bg-moss-900/90 px-3.5 py-2 text-lime-300 backdrop-blur-sm">
              <IconGift className="size-3.5" />
              100% бесплатно
            </span>
          </figure>

          <div className="anim-float absolute -bottom-6 left-4 right-4 flex items-center gap-3.5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_18px_44px_-22px_rgba(38,40,31,0.35)] sm:left-8 sm:right-auto sm:min-w-[300px]">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-200 font-display text-sm font-semibold text-lime-700">
              {author.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold">{author.name}</span>
              <span className="mt-0.5 block truncate text-xs text-ink-soft">{author.role}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
