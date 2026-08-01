import Link from "next/link";
import { siteConfig } from "@/config/site";
import { IconInstagram, IconSpark, IconTelegram, IconYoutube } from "./icons";

export default function Footer() {
  const { author, socials } = siteConfig;
  const year = new Date().getFullYear();

  const links = [
    { ...socials.telegram, Icon: IconTelegram },
    { ...socials.instagram, Icon: IconInstagram },
    { ...socials.youtube, Icon: IconYoutube },
  ];

  return (
    <footer className="mt-20 border-t border-line lg:mt-28">
      <div className="container-x py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-moss-900 text-lime-300">
                <IconSpark className="size-5" />
              </span>
              <span className="font-display text-[15px] font-medium tracking-tight">{author.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              {author.role}. Лидмагнит бесплатный — забирайте, применяйте и делитесь
              ссылкой с друзьями.
            </p>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Социальные сети">
            {links.map(({ label, handle, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-3 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lime-100"
              >
                <Icon className="size-5 text-ink-soft transition-colors group-hover:text-lime-700" />
                <span className="text-sm font-medium">{label}</span>
                <span className="hidden font-mono text-xs text-ink-faint sm:inline">{handle}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {author.name}. Лидмагнит можно пересылать. Продавать его нельзя.</p>
          <a
            href="#top"
            className="nav-link w-fit text-ink-soft transition-colors hover:text-ink"
          >
            Наверх ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
