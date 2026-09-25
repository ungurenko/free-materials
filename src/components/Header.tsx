import Link from "next/link";
import { pageCopy } from "@/content/leadmagnet";
import { siteConfig } from "@/config/site";
import { IconSpark, IconTelegram } from "./icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-milk/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(38,40,31,0.25)]">
      <div className="container-x flex min-h-16 items-center justify-between gap-4 py-2">
        <Link href="/#main" className="group flex min-w-0 flex-1 items-center gap-2.5" aria-label={`${pageCopy.header.brand} — перейти в начало`}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-moss-900 text-lime-300 transition-transform duration-300 group-hover:rotate-6">
            <IconSpark className="size-5" />
          </span>
          <span className="min-w-0 break-words font-display text-[0.8125rem] font-medium leading-tight tracking-tight sm:text-[0.9375rem]">
            {pageCopy.header.brand}
          </span>
        </Link>

        <a
          href={siteConfig.socials.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pageCopy.header.telegram}
          className="btn-primary h-auto min-h-10 shrink-0 px-4 py-2.5 text-sm sm:px-5"
        >
          <IconTelegram className="size-[1.125rem]" />
          <span className="hidden sm:inline">{pageCopy.header.telegram}</span>
        </a>
      </div>
    </header>
  );
}
