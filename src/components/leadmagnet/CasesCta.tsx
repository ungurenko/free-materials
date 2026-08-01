import { telegramCta } from "@/content/leadmagnet";
import Reveal from "@/components/Reveal";

export default function CasesCta() {
  const { cases } = telegramCta;

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[24px] border border-line bg-moss-900 p-5 text-milk sm:p-7">
        <div
          className="dot-grid-light pointer-events-none absolute -right-12 -top-12 size-56 opacity-70"
          style={{ maskImage: "radial-gradient(closest-side, black, transparent)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 size-56 rounded-full bg-lime-500/20 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-3xl">
          <p className="pill border border-lime-400/30 bg-moss-950 px-3 py-1.5 text-lime-300">
            <span className="anim-pulse-dot size-1.5 rounded-full bg-lime-400" aria-hidden />
            Пришлите свой результат
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-milk/90 sm:text-base">
            {cases.text}
          </p>

          <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-lime-300/80">
            {cases.benefitsTitle}
          </p>
          <ul className="mt-3 grid gap-1.5 text-[14.5px] leading-snug text-milk/85 sm:grid-cols-2 sm:gap-x-6">
            {cases.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime-400" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
