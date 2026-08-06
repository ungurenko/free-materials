import Link from "next/link";
import { pageCopy } from "@/content/leadmagnet";
import { siteConfig } from "@/config/site";
import { IconSpark, IconTelegram } from "./icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-milk/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(38,40,31,0.25)]">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/#main" className="group flex min-w-0 items-center gap-2.5" aria-label="Вайб-кодинг с нуля — перейти в начало">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-moss-900 text-lime-300 transition-transform duration-300 group-hover:rotate-6">
            <IconSpark className="size-5" />
          </span>
          <span className="truncate font-display text-[13px] font-medium tracking-tight sm:text-[15px]">
            {pageCopy.header.brand}
          </span>
        </Link>

        <a
          href={siteConfig.socials.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pageCopy.header.telegram}
          className="btn-primary h-10 px-4 text-sm sm:px-5"
        >
          <IconTelegram className="size-[18px]" />
          <span className="hidden sm:inline">{pageCopy.header.telegram}</span>
        </a>
      </div>
    </header>
  );
}
