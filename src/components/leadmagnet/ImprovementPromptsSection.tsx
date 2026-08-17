"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrowRight, IconCheck, IconCopy } from "@/components/icons";
import { improvementPrompts, pageCopy } from "@/content/leadmagnet";
import { copyText } from "@/lib/copy";

export default function ImprovementPromptsSection() {
  const [copyStatus, setCopyStatus] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState("");
  const [activePromptId, setActivePromptId] = useState(improvementPrompts[0].id);
  const copyTimer = useRef<number | undefined>(undefined);
  const copy = pageCopy.improvementPrompts;
  const activePromptIndex = Math.max(0, improvementPrompts.findIndex((prompt) => prompt.id === activePromptId));
  const activePrompt = improvementPrompts[activePromptIndex];

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const handlePromptCopy = async (id: string, text: string) => {
    const copied = await copyText(text);
    setCopiedPromptId(copied ? id : "");
    setCopyStatus(copied ? copy.copiedStatus : copy.copyErrorStatus);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => {
      setCopyStatus("");
      setCopiedPromptId("");
    }, 2100);
  };

  return (
    <section className="relative mt-16 scroll-mt-24 overflow-hidden border-y border-lime-300/80 bg-lime-100 py-12 sm:mt-20 sm:py-14" aria-labelledby="improvement-prompts-title">
      <div className="dot-grid pointer-events-none absolute -right-20 -top-16 size-80 opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="pill w-fit border border-lime-400/70 bg-paper/70 px-4 py-2 text-lime-700">{copy.eyebrow}</p>
            <h2 id="improvement-prompts-title" className="mt-4 max-w-xl font-display text-[1.8rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.35rem]">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base lg:pb-1">{copy.description}</p>
        </div>

        <div className="mt-7 space-y-2 lg:hidden">
          {improvementPrompts.map((prompt, index) => {
            const active = activePromptId === prompt.id;
            const copied = copiedPromptId === prompt.id;

            return (
              <article key={prompt.id} className={`overflow-hidden rounded-2xl border transition ${active ? "border-lime-400 bg-paper shadow-[0_18px_42px_-34px_rgba(38,40,31,0.45)]" : "border-lime-300/80 bg-paper/70"}`}>
                <button
                  type="button"
                  onClick={() => setActivePromptId(prompt.id)}
                  aria-expanded={active}
                  aria-controls={`mobile-panel-${prompt.id}`}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold ${active ? "bg-moss-950 text-paper" : "bg-lime-200 text-lime-700"}`} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[15px] font-semibold leading-snug text-ink">{prompt.title}</span>
                  <IconArrowRight className={`size-4 shrink-0 text-lime-700 transition-transform ${active ? "rotate-90" : ""}`} />
                </button>
                {active && (
                  <div id={`mobile-panel-${prompt.id}`} className="border-t border-lime-200 px-4 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-ink-soft">{prompt.text}</p>
                    <button
                      type="button"
                      onClick={() => handlePromptCopy(prompt.id, prompt.text)}
                      aria-label={`${copy.copyLabel}: ${prompt.title}`}
                      className="btn-primary mt-4 h-11 w-full px-4 text-sm sm:w-fit"
                    >
                      {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                      {copy.copyLabel}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 hidden overflow-hidden rounded-[26px] border border-lime-300/80 bg-paper/85 shadow-[0_26px_64px_-46px_rgba(38,40,31,0.55)] lg:grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-r border-lime-200 bg-milk/70 p-3" role="tablist" aria-label="Пять промптов для доводки проекта">
            {improvementPrompts.map((prompt, index) => {
              const active = activePromptId === prompt.id;

              return (
                <button
                  key={prompt.id}
                  id={`desktop-tab-${prompt.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`desktop-panel-${prompt.id}`}
                  onClick={() => setActivePromptId(prompt.id)}
                  className={`group flex min-h-[68px] w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? "bg-moss-950 text-paper shadow-[0_14px_30px_-22px_rgba(27,33,19,0.75)]" : "text-ink hover:bg-lime-100"}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold ${active ? "bg-lime-300 text-moss-950" : "bg-paper text-lime-700"}`} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-sm font-semibold leading-snug">{prompt.title}</span>
                  <IconArrowRight className={`size-4 shrink-0 transition-transform ${active ? "translate-x-0.5 text-lime-300" : "text-ink-faint group-hover:translate-x-0.5"}`} />
                </button>
              );
            })}
          </div>

          <article
            id={`desktop-panel-${activePrompt.id}`}
            role="tabpanel"
            aria-labelledby={`desktop-tab-${activePrompt.id}`}
            className="relative flex min-h-[364px] flex-col overflow-hidden p-8 xl:p-10"
          >
            <span className="pointer-events-none absolute -right-2 -top-12 font-display text-[10rem] font-semibold leading-none text-lime-100" aria-hidden>
              {String(activePromptIndex + 1).padStart(2, "0")}
            </span>
            <div className="relative z-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-lime-700">
                Шаг {activePromptIndex + 1} из {improvementPrompts.length}
              </p>
              <h3 className="mt-4 max-w-xl font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-ink xl:text-[2rem]">
                {activePrompt.title}
              </h3>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-ink-soft xl:text-base">{activePrompt.text}</p>
            </div>
            <button
              type="button"
              onClick={() => handlePromptCopy(activePrompt.id, activePrompt.text)}
              aria-label={`${copy.copyLabel}: ${activePrompt.title}`}
              className="btn-primary relative z-10 mt-auto h-12 w-fit px-5 text-sm"
            >
              {copiedPromptId === activePrompt.id ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
              {copy.copyLabel}
            </button>
          </article>
        </div>
      </div>

      <p className={`fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-moss-950 px-4 py-2.5 text-sm text-paper shadow-xl transition ${copyStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} role="status" aria-live="polite">
        {copyStatus}
      </p>
    </section>
  );
}
