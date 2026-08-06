"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics/umami";
import { IconArrowUpRight } from "./icons";
import Reveal from "./Reveal";

export default function PromoBanner() {
  const promo = siteConfig.promoBanner;

  if (!promo.enabled) return null;

  return (
    <section className="promo-banner-section container-x pb-12 sm:pb-16" aria-labelledby="promo-banner-title">
      <Reveal>
        <div className="group relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-moss-950 text-paper shadow-[0_34px_80px_-42px_rgba(27,33,19,0.75)] sm:rounded-[36px]">
          <div className="pointer-events-none absolute -left-24 -top-28 size-80 rounded-full bg-fuchsia-400/15 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-36 right-0 size-96 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden />
          <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-35" aria-hidden />

          <div className="relative grid items-center lg:grid-cols-[0.92fr_1.08fr]">
            <div className="z-10 min-w-0 px-6 py-8 sm:px-10 sm:py-11 lg:py-14 lg:pl-14 lg:pr-6">
              <Image
                src={promo.logo.src}
                alt={promo.logo.alt}
                width={640}
                height={339}
                priority
                fetchPriority="high"
                className="h-auto w-36 drop-shadow-[0_12px_28px_rgba(238,170,255,0.24)] sm:w-44"
              />

              <p className="pill mt-7 w-fit border border-white/15 bg-white/[0.06] px-3.5 py-2 text-lime-300">
                {promo.eyebrow}
              </p>
              <h2 id="promo-banner-title" className="mt-5 max-w-xl font-display text-[clamp(1.7rem,3.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-paper">
                {promo.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
                {promo.description}
              </p>
              <p className="mt-5 text-sm font-medium leading-relaxed text-lime-300 sm:text-[15px]">
                {promo.meta}
              </p>
              <a
                href={promo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-dark mt-7 min-h-12 w-full px-6 text-[15px] shadow-[0_14px_34px_-16px_rgba(178,201,110,0.75)] sm:w-fit"
                onClick={() =>
                  trackEvent({
                    name: "promo_click",
                    props: { promo_id: promo.id, placement: "home_after_hero" },
                  })
                }
              >
                {promo.buttonLabel}
                <IconArrowUpRight className="size-[18px]" />
              </a>
            </div>

            <div className="relative min-h-[255px] overflow-hidden px-5 pb-0 sm:min-h-[360px] sm:px-10 lg:min-h-[520px] lg:px-0">
              <div className="absolute inset-x-5 bottom-[-7%] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-0 sm:inset-x-10 lg:-right-[12%] lg:left-3 lg:bottom-[-2%] lg:rotate-[1.5deg]">
                <Image
                  src={promo.image.src}
                  alt={promo.image.alt}
                  width={1200}
                  height={890}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 58vw, calc(100vw - 80px)"
                  className="h-auto w-full drop-shadow-[0_28px_42px_rgba(0,0,0,0.38)]"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
