import Image from "next/image";
import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import { IconArrowUpRight, IconSpark, IconTelegram, IconYoutube } from "./icons";

const links = [
  {
    id: "youtube",
    icon: IconYoutube,
    content: pageCopy.usefulLinks.youtube,
    url: siteConfig.socials.youtube.url,
  },
  {
    id: "idea-bot",
    icon: IconSpark,
    content: pageCopy.usefulLinks.ideaBot,
    url: siteConfig.socials.ideaBot.url,
  },
  {
    id: "telegram",
    icon: IconTelegram,
    content: pageCopy.usefulLinks.telegram,
    url: siteConfig.socials.telegram.url,
  },
];

export default function UsefulLinksSection() {
  const [youtube, ideaBot, telegram] = links;

  return (
    <section className="container-x pt-12 sm:pt-16" aria-labelledby="useful-links-title">
      <div className="overflow-hidden rounded-[30px] border border-line bg-paper px-5 py-7 shadow-[0_28px_70px_-50px_rgba(38,40,31,0.45)] sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-end sm:gap-10">
          <div>
            <p className="pill w-fit border border-line bg-milk px-3 py-1.5 text-ink-faint">{pageCopy.usefulLinks.eyebrow}</p>
            <h2 id="useful-links-title" className="mt-4 font-display text-[1.8rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.35rem]">
              {pageCopy.usefulLinks.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-soft sm:text-[15px]">{pageCopy.usefulLinks.description}</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <ResourceCard resource={youtube} featured />
          <div className="grid gap-4">
            <ResourceCard resource={ideaBot} tone="dark" />
            <ResourceCard resource={telegram} tone="lime" />
          </div>
        </div>
      </div>
    </section>
  );
}

type Resource = (typeof links)[number];

function ResourceCard({ resource, featured = false, tone = "light" }: { resource: Resource; featured?: boolean; tone?: "light" | "dark" | "lime" }) {
  const { icon: Icon, content, url } = resource;
  const toneClasses = {
    light: "border-[#f0d7ce] bg-[#fff4ef] text-ink",
    dark: "border-moss-800 bg-moss-950 text-paper",
    lime: "border-lime-300 bg-lime-100 text-ink",
  }[tone];
  const mutedClasses = tone === "dark" ? "text-paper/70" : "text-ink-soft";
  const iconClasses = tone === "dark" ? "bg-paper/10 text-lime-300" : "bg-paper text-lime-700";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-34px_rgba(38,40,31,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime-600 ${featured ? "min-h-[320px] sm:p-8" : "min-h-[210px]"} ${toneClasses}`}
    >
      {featured ? (
        <>
          <Image
            src="/images/resources/youtube-play.webp"
            alt=""
            width={800}
            height={560}
            className="pointer-events-none absolute -right-[14%] -top-[4%] w-[78%] rotate-[-5deg] opacity-25 sm:-right-[10%] sm:-top-[8%] sm:w-[72%]"
            aria-hidden
          />
          <span className="relative z-10 w-fit rounded-full border border-[#efb5ab] bg-paper/85 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#b83227] backdrop-blur-sm">
            Бесплатно
          </span>
        </>
      ) : (
        <span className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-sm ${iconClasses}`} aria-hidden>
          <Icon className="size-5" />
        </span>
      )}
      <span className="relative z-10 mt-auto block pt-10">
        <span className={`block font-mono text-[10px] uppercase tracking-[0.12em] ${mutedClasses}`}>{content.metaLabel}</span>
        <span className={`mt-2 block font-display font-semibold leading-tight tracking-[-0.02em] ${featured ? "max-w-md text-[1.65rem] sm:text-[2rem]" : "text-xl"}`}>
          {content.title}
        </span>
        <span className={`mt-3 block max-w-xl text-sm leading-relaxed ${mutedClasses}`}>{content.description}</span>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${tone === "dark" ? "text-lime-300" : "text-lime-700"}`}>
          {content.buttonLabel}
          <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
