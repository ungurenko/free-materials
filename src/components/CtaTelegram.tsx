import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import { IconArrowRight, IconTelegram } from "./icons";

export default function CtaTelegram() {
  return (
    <section className="telegram-cta container-x pt-10 sm:pt-14" aria-labelledby="telegram-title">
      <div className="dot-grid-light relative overflow-hidden rounded-[28px] bg-moss-900 px-6 py-8 text-on-dark shadow-[0_30px_70px_-40px_rgba(27,33,19,0.7)] sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="relative max-w-2xl">
          <h2 id="telegram-title" className="font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.015em] sm:text-[2rem]">
            {pageCopy.telegram.title}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-dark/75 sm:text-base">{pageCopy.telegram.text}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-dark/55">{pageCopy.telegram.note}</p>
        </div>
        <a
          href={siteConfig.socials.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-on-dark relative mt-7 h-auto min-h-12 w-full min-w-0 shrink-0 whitespace-normal px-3 py-3 text-center text-[0.875rem] sm:w-fit sm:whitespace-nowrap sm:px-6 sm:text-[0.9375rem] lg:mt-0"
        >
          <IconTelegram className="size-5" />
          {pageCopy.telegram.buttonLabel}
          <IconArrowRight className="hidden size-4 sm:block rtl:-scale-x-100" />
        </a>
      </div>
    </section>
  );
}
