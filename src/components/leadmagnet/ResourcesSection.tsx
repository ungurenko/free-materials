"use client";

import { useEffect, useState, type ReactNode } from "react";
import { checklistItems, pageCopy, safetyRules, services } from "@/content/leadmagnet";
import { getChecklistProgress, parseChecklistState } from "@/lib/leadmagnet-state";

const checklistStorageKey = "vibeCodingChecklist";

function Accordion({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_16px_38px_-34px_rgba(38,40,31,0.4)]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`panel-${id}`}
          id={`trigger-${id}`}
          className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-lime-100/60 sm:px-6"
        >
          <span className="font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">{title}</span>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full border border-line bg-milk text-xl font-light text-ink-soft transition-transform ${open ? "rotate-45" : ""}`} aria-hidden>+</span>
        </button>
      </h3>
      <section
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`trigger-${id}`}
        hidden={!open}
        className="accordion-panel border-t border-line px-5 py-6 sm:px-6"
      >
        {children}
      </section>
    </article>
  );
}

export default function ResourcesSection() {
  const [openPanels, setOpenPanels] = useState<string[]>([]);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [checklistHydrated, setChecklistHydrated] = useState(false);
  const progress = getChecklistProgress(checkedIndexes, checklistItems.length);

  useEffect(() => {
    setCheckedIndexes(parseChecklistState(localStorage.getItem(checklistStorageKey), checklistItems.length));
    setChecklistHydrated(true);
  }, []);

  useEffect(() => {
    if (!checklistHydrated) return;
    try {
      localStorage.setItem(checklistStorageKey, JSON.stringify(checkedIndexes));
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
  }, [checkedIndexes, checklistHydrated]);

  const togglePanel = (id: string) => {
    setOpenPanels((current) => current.includes(id) ? current.filter((panel) => panel !== id) : [...current, id]);
  };

  const handleCheck = (index: number) => {
    setCheckedIndexes((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b));
  };

  return (
    <section className="container-x scroll-mt-24 pt-16 sm:pt-20" aria-labelledby="resources-title">
      <div className="max-w-2xl">
        <h2 id="resources-title" className="font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[2.15rem]">
          {pageCopy.resources.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{pageCopy.resources.description}</p>
      </div>

      <div className="mt-9 space-y-3">
        <Accordion id="services" title={pageCopy.resources.servicesTitle} open={openPanels.includes("services")} onToggle={() => togglePanel("services")}>
          <div className="grid gap-4 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="flex flex-col rounded-2xl border border-line bg-milk/55 p-5">
                <h4 className="font-display text-base font-semibold text-ink">{service.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{service.description}</p>
                <a href={service.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 h-11 px-4 text-sm">{service.buttonLabel}</a>
              </article>
            ))}
          </div>
          <p className="mt-5 text-[15px] font-semibold text-ink">{pageCopy.resources.servicesRecommendation}</p>
        </Accordion>

        <Accordion id="checklist" title={pageCopy.resources.checklistTitle} open={openPanels.includes("checklist")} onToggle={() => togglePanel("checklist")}>
          <p className="text-sm leading-relaxed text-ink-soft">{pageCopy.resources.checklistIntro}</p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {checklistItems.map((item, index) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-milk/55 p-3.5 transition-colors hover:border-lime-400">
                <input type="checkbox" checked={checkedIndexes.includes(index)} onChange={() => handleCheck(index)} className="mt-0.5 size-5 shrink-0 accent-lime-600" />
                <span className="text-sm leading-snug text-ink">{item}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="shrink-0 font-mono text-xs text-ink-soft">Проверено: {progress.count} из {checklistItems.length}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden><span className="block h-full rounded-full bg-lime-500 transition-[width] duration-300" style={{ width: `${progress.percent}%` }} /></span>
          </div>
          {progress.complete && <p className="mt-5 rounded-xl border border-lime-300 bg-lime-100 p-4 text-sm font-semibold text-moss-900">Первый проект готов. Вы уже попробовали вайб-кодинг на практике.</p>}
        </Accordion>

        <Accordion id="safety" title={pageCopy.resources.safetyTitle} open={openPanels.includes("safety")} onToggle={() => togglePanel("safety")}>
          <div className="rounded-2xl border border-[#e4c9c2] bg-[#fff7f4] p-5 text-[#6d3530]">
            <strong className="text-[15px]">{safetyRules.intro}</strong>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">{safetyRules.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="mt-4 text-sm leading-relaxed">{safetyRules.note}</p>
          </div>
        </Accordion>
      </div>
    </section>
  );
}
