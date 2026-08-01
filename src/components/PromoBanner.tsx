import { siteConfig } from "@/config/site";
import { IconArrowUpRight } from "./icons";
import Reveal from "./Reveal";

export default function PromoBanner() {
  const { promo } = siteConfig;

  if (!promo.enabled) return null;

  return (
    <section className="container-x" aria-label={promo.label}>
      <Reveal>
        <a
          href={promo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-[28px] border border-moss-800 bg-moss-900 text-milk transition-shadow duration-300 hover:shadow-[0_36px_80px_-40px_rgba(27,33,19,0.7)] focus-visible:outline-lime-400"
        >
          <div className="dot-grid-light pointer-events-none absolute -left-10 -top-16 size-64 opacity-60" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-lime-500/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 right-1/3 hidden size-64 rounded-full border border-lime-400/20 lg:block"
            aria-hidden
          />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:p-12">
            <div>
              {promo.label && (
                <p className="pill border border-lime-400/40 bg-lime-400/10 px-3.5 py-2 text-lime-300">
                  <span className="size-1.5 rounded-full bg-lime-400" aria-hidden />
                  {promo.label}
                </p>
              )}
              {promo.title && (
                <h2 className="mt-5 max-w-md font-display text-xl font-medium leading-snug sm:text-2xl lg:text-[1.7rem]">
                  {promo.title}
                </h2>
              )}
              {promo.description && (
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-milk/70">
                  {promo.description}
                </p>
              )}
              {promo.buttonLabel && (
                <span className="btn-on-dark mt-8 h-12 px-7 text-[15px]">
                  {promo.buttonLabel}
                  <IconArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              )}
            </div>

            {promo.image && (
              <div className="relative">
                <img
                  src={promo.image}
                  alt={promo.imageAlt}
                  className="aspect-[16/10] w-full rounded-2xl border border-moss-800 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

              </div>
            )}
          </div>
        </a>
      </Reveal>
    </section>
  );
}
