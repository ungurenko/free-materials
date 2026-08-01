import { services } from "@/content/leadmagnet";
import { IconArrowUpRight } from "@/components/icons";
import Reveal from "@/components/Reveal";

const accent = {
  "google-ai-studio": {
    label: "Google",
    ring: "border-line bg-paper",
    badge: "border-blue-200 bg-blue-50 text-blue-800",
    dot: "bg-blue-500",
  },
  "qwen-studio": {
    label: "Qwen",
    ring: "border-line bg-paper",
    badge: "border-orange-200 bg-orange-50 text-orange-800",
    dot: "bg-orange-500",
  },
  "glm-z-ai": {
    label: "GLM",
    ring: "border-line bg-paper",
    badge: "border-violet-200 bg-violet-50 text-violet-800",
    dot: "bg-violet-500",
  },
} as const;

export default function ServicesSection() {
  return (
    <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-7">
      {services.map((service, i) => {
        const a = accent[service.id as keyof typeof accent];
        return (
          <Reveal key={service.id} delay={(i % 3) * 100}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-400 hover:shadow-[0_30px_64px_-34px_rgba(38,40,31,0.4)] sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`pill border px-3.5 py-2 text-[11px] ${a.badge}`}
                >
                  <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden />
                  {a.label}
                </span>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Открыть ${service.name}`}
                  className="grid size-9 place-items-center rounded-full border border-line bg-milk text-ink-soft transition-colors hover:border-lime-400 hover:text-lime-700"
                >
                  <IconArrowUpRight className="size-4" />
                </a>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[1.4rem]">
                {service.name}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-lime-700 sm:text-[15px]">
                {service.tagline}
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">
                {service.description}
              </p>

              <div className="mt-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  Подходит для
                </p>
                <ul className="mt-3 space-y-1.5 text-[14.5px] leading-snug text-ink sm:text-[15px]">
                  {service.suitableFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-lime-500"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-line/80 bg-milk/60 p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  Как начать
                </p>
                <ol className="mt-3 space-y-2 text-[14.5px] leading-snug text-ink-soft sm:text-[15px]">
                  {service.howToStart.map((step, idx) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line bg-paper font-mono text-[10px] text-lime-700">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-5 border-t border-line/80 pt-4 text-[13.5px] leading-relaxed text-ink-faint">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  Особенность
                </span>
                <br />
                {service.feature}
              </p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
