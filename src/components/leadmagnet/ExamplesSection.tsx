import Reveal from "@/components/Reveal";
import { examples } from "@/content/leadmagnet";

export default function ExamplesSection() {
  return (
    <div>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {examples.intro}
      </p>

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Reveal key={i} delay={((i - 1) % 3) * 100}>
            <figure className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-[0_24px_56px_-32px_rgba(38,40,31,0.3)]">
              <div className="relative aspect-[4/3] w-full border-b border-line bg-milk">
                <div
                  className="dot-grid pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    maskImage: "radial-gradient(closest-side, black, transparent)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <span className="grid size-12 place-items-center rounded-2xl border border-line bg-paper text-ink-soft">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4.5" width="18" height="14" rx="2" />
                        <circle cx="9" cy="10" r="1.5" />
                        <path d="m4 17 4.5-4.5L13 17" />
                        <path d="m14 14 3 3" />
                        <path d="m20 14-3 3" />
                      </svg>
                    </span>
                    <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                      Скриншот проекта
                    </p>
                    <p className="mt-1 text-[12.5px] text-ink-soft">
                      появится позже
                    </p>
                  </div>
                </div>
              </div>
              <figcaption className="p-4 sm:p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  Проект {String(i).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">
                  Пример результата будет добавлен после первой генерации.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-[14.5px] leading-relaxed text-ink-faint">
        {examples.note}
      </p>
    </div>
  );
}
