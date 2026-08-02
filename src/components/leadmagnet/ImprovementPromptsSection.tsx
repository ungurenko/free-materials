"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@/components/icons";
import { improvementPrompts, pageCopy } from "@/content/leadmagnet";
import { copyText } from "@/lib/copy";

export default function ImprovementPromptsSection() {
  const [copyStatus, setCopyStatus] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState("");
  const copyTimer = useRef<number | undefined>(undefined);
  const copy = pageCopy.improvementPrompts;

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
    <section className="relative mt-16 scroll-mt-24 overflow-hidden border-y border-lime-300/80 bg-lime-100 py-16 sm:mt-20 sm:py-20" aria-labelledby="improvement-prompts-title">
      <div className="dot-grid pointer-events-none absolute -right-20 -top-16 size-80 opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="pill w-fit border border-lime-400/70 bg-paper/70 px-4 py-2 text-lime-700">{copy.eyebrow}</p>
          <h2 id="improvement-prompts-title" className="mt-5 font-display text-[1.8rem] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            {copy.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{copy.description}</p>
        </div>

        <div className="mt-9 space-y-3 sm:mt-10">
          {improvementPrompts.map((prompt, index) => {
            const copied = copiedPromptId === prompt.id;

            return (
              <article key={prompt.id} className="grid gap-4 rounded-2xl border border-lime-300/80 bg-paper/85 p-5 shadow-[0_18px_42px_-36px_rgba(38,40,31,0.5)] sm:p-6 lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                <span className="font-mono text-sm font-semibold text-lime-700" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">{prompt.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{prompt.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePromptCopy(prompt.id, prompt.text)}
                  aria-label={`${copy.copyLabel}: ${prompt.title}`}
                  className="btn-primary h-11 w-full px-4 text-sm sm:w-fit"
                >
                  {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                  {copy.copyLabel}
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <p className={`fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-moss-950 px-4 py-2.5 text-sm text-paper shadow-xl transition ${copyStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} role="status" aria-live="polite">
        {copyStatus}
      </p>
    </section>
  );
}
