import { pageCopy } from "@/content/leadmagnet";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="site-footer mt-16 border-t border-line sm:mt-20">
      <div className="container-x flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <strong className="font-display text-sm font-medium tracking-tight">{pageCopy.footer.brand}</strong>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-ink-faint">
          <a
            href={siteConfig.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-lime-700"
          >
            {pageCopy.footer.telegram}
          </a>
          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-lime-700"
          >
            {siteConfig.socials.youtube.label}
          </a>
          <a
            href={siteConfig.socials.ideaBot.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-lime-700"
          >
            {siteConfig.socials.ideaBot.label}
          </a>
          <span>© {new Date().getFullYear()}</span>
          <span>{pageCopy.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
