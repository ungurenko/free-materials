import { siteConfig } from "@/config/site";
import { pageCopy } from "@/content/leadmagnet";
import { IconArrowUpRight, IconSpark, IconYoutube } from "./icons";

const links = [
  {
    id: "youtube",
    index: "01",
    label: "Смотреть",
    icon: IconYoutube,
    content: pageCopy.usefulLinks.youtube,
    url: siteConfig.socials.youtube.url,
    cardClassName: "bg-[#fff0ec] text-ink shadow-[0_24px_52px_-40px_rgba(130,54,43,0.55)]",
    iconClassName: "bg-[#f25f51] text-paper",
    labelClassName: "text-[#a23d31]",
    descriptionClassName: "text-ink-soft",
    decorationClassName: "text-[#f25f51]/10",
  },
  {
    id: "idea-bot",
    index: "02",
    label: "Выбрать",
    icon: IconSpark,
    content: pageCopy.usefulLinks.ideaBot,
    url: siteConfig.socials.ideaBot.url,
    cardClassName: "bg-moss-900 text-paper shadow-[0_24px_52px_-40px_rgba(27,33,19,0.8)]",
    iconClassName: "bg-lime-300 text-moss-950",
    labelClassName: "text-lime-300",
    descriptionClassName: "text-paper/70",
    decorationClassName: "text-lime-300/10",
  },
];

export default function UsefulLinksSection() {
  return (
    <section className="container-x pt-16 sm:pt-20" aria-labelledby="useful-links-title">
      <div className="relative isolate overflow-hidden rounded-[30px] border border-line bg-paper px-6 py-8 shadow-[0_30px_70px_-52px_rgba(38,40,31,0.45)] sm:px-10 sm:py-11 lg:px-14 lg:py-14">
        <span className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[clamp(4.5rem,13vw,10.5rem)] font-semibold leading-none tracking-[-0.1em] text-lime-100" aria-hidden>
          СОЗДАВАЙ
        </span>

        <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end lg:gap-12">
          <div className="max-w-3xl">
            <p className="pill w-fit border border-lime-300 bg-lime-100 px-3.5 py-2 text-lime-700">Следующий шаг</p>
            <h2 id="useful-links-title" className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.35rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
              {pageCopy.usefulLinks.title}
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft sm:text-base lg:pb-1">{pageCopy.usefulLinks.description}</p>
        </div>

        <div className="relative mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {links.map(({ id, index, label, icon: Icon, content, url, cardClassName, iconClassName, labelClassName, descriptionClassName, decorationClassName }) => (
            <article key={id} className="min-w-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex min-h-[290px] h-full flex-col overflow-hidden rounded-[24px] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-600 sm:min-h-[330px] sm:p-8 ${cardClassName}`}
              >
                <span className={`pointer-events-none absolute -right-6 -top-14 select-none font-display text-[11rem] font-semibold leading-none tracking-[-0.12em] ${decorationClassName}`} aria-hidden>
                  {index}
                </span>
                <div className="relative flex items-start justify-between gap-5">
                  <span className="font-mono text-[11px] font-medium tracking-[0.13em]">{index} / {label}</span>
                  <span className={`grid size-11 place-items-center rounded-2xl ${iconClassName}`} aria-hidden>
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="relative mt-auto">
                  <h3 className="max-w-sm font-display text-[1.45rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[1.7rem]">{content.title}</h3>
                  <p className={`mt-4 max-w-md text-[15px] leading-relaxed ${descriptionClassName}`}>{content.description}</p>
                  <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${labelClassName}`}>
                    {content.buttonLabel}
                    <IconArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
