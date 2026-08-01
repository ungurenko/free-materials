import { checklistItems } from "@/content/leadmagnet";
import Reveal from "@/components/Reveal";

export default function Checklist() {
  return (
    <ol className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
      {checklistItems.map((item, i) => (
        <Reveal key={item} delay={(i % 2) * 100}>
          <li className="group flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-lime-300 sm:p-5">
            <span
              aria-hidden
              className="mt-0.5 size-6 shrink-0 rounded-md border border-line-strong bg-milk transition-colors group-hover:border-lime-400"
            />
            <span className="text-[15px] leading-snug text-ink sm:text-[15.5px]">
              {item}
            </span>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
