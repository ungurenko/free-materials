import { siteConfig } from "@/config/site";
import { telegramCta } from "@/content/leadmagnet";
import { IconTelegram } from "./icons";
import Reveal from "./Reveal";

export default function CtaTelegram() {
  const { socials } = siteConfig;
  const { main } = telegramCta;

  return (
    <section className="container-x" aria-label="Подписка на Telegram-канал">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-lime-300/70 bg-lime-100">
          <div
            className="dot-grid pointer-events-none absolute -right-10 -top-14 size-60 opacity-80"
            style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }}
            aria-hidden
          />
          <IconTelegram
            className="pointer-events-none absolute -bottom-10 -right-8 size-48 rotate-12 text-lime-300/60"
            aria-hidden
          />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div className="max-w-xl">
              <p className="pill border border-lime-500/30 bg-paper/70 px-3.5 py-2 text-lime-700">
                <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-600" aria-hidden />
                Telegram-канал
              </p>
              <h2 className="mt-5 font-display text-xl font-medium leading-snug text-moss-950 sm:text-2xl lg:text-[1.65rem]">
                {main.text}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-moss-800/80">
                {main.detail}
              </p>
            </div>
            <div className="lg:pl-4">
              <a
                href={socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary h-13 w-full px-8 text-[15px] sm:w-auto"
              >
                <IconTelegram className="size-5" />
                {main.buttonLabel}
              </a>
              <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-lime-700/70 lg:text-right">
                {socials.telegram.handle}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
