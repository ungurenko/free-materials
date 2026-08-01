import { comparisonRows } from "@/content/leadmagnet";
import Reveal from "@/components/Reveal";

export default function ComparisonTable() {
  return (
    <div className="mt-10 overflow-hidden rounded-[24px] border border-line bg-paper shadow-[0_18px_44px_-30px_rgba(38,40,31,0.25)] sm:mt-12">
      <div className="hidden border-b border-line bg-milk/60 px-6 py-4 sm:grid sm:grid-cols-[1.4fr_1fr] sm:gap-6">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
          Задача
        </p>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
          Рекомендуемый сервис
        </p>
      </div>

      <ul>
        {comparisonRows.map((row, i) => (
          <Reveal key={row.task} delay={(i % 6) * 60}>
            <li
              className={`grid gap-3 px-5 py-5 sm:grid-cols-[1.4fr_1fr] sm:items-center sm:gap-6 sm:px-6 ${
                i !== 0 ? "border-t border-line" : ""
              } transition-colors hover:bg-lime-100/40`}
            >
              <p className="text-[15px] leading-snug text-ink sm:text-[16px]">
                {row.task}
              </p>
              <p className="text-[15px] font-medium leading-snug text-lime-700 sm:text-[16px]">
                {row.service}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
