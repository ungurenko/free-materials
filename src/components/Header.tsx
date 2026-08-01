"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { IconSpark, IconTelegram } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const { author, socials } = siteConfig;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-milk/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(38,40,31,0.25)]">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label="На главную">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-moss-900 text-lime-300 transition-transform duration-300 group-hover:rotate-6">
            <IconSpark className="size-5" />
          </span>
          <span className="truncate font-display text-[15px] font-medium tracking-tight">
            {author.name}
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          {pathname !== "/" && (
            <Link
              href="/#projects"
              className="nav-link hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
            >
              Проекты
            </Link>
          )}
          {pathname !== "/" && (
            <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden />
          )}
          <a
            href={socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-10 px-4 text-sm sm:px-5"
          >
            <IconTelegram className="size-[18px]" />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
