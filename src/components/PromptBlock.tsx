"use client";

import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/copy";
import { trackPromptCopy } from "@/lib/analytics/umami";
import { IconCheck, IconCopy } from "./icons";

interface PromptBlockProps {
  id: string;
  title?: string;
  description?: string;
  prompt: string;
  index: number;
  materialSlug?: string;
}

export default function PromptBlock({ id, title, description, prompt, index, materialSlug }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(prompt);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);

    if (materialSlug) {
      trackPromptCopy(materialSlug, id);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#f1f2e9] transition-shadow duration-300 hover:shadow-[0_18px_44px_-30px_rgba(38,40,31,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/80 bg-paper/70 px-4 py-3.5 sm:flex-nowrap sm:px-5">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="shrink-0 font-mono text-xs font-medium text-lime-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          {title && (
            <h3 className="truncate text-[15px] font-semibold text-ink sm:text-base">{title}</h3>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Скопировать промпт${title ? ` «${title}»` : ""}`}
          className={`${copied ? "btn-primary" : "btn-ghost"} ml-auto h-11 min-w-[142px] shrink-0 px-5 text-sm`}
        >
          {copied ? <IconCheck className="size-[18px]" /> : <IconCopy className="size-[18px]" />}
          <span aria-live="polite">{copied ? "Скопировано" : "Скопировать"}</span>
        </button>
      </div>

      {description && (
        <p className="border-b border-line/60 px-4 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-5">
          {description}
        </p>
      )}

      <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-5 font-mono text-[13px] leading-[1.75] text-ink/85 sm:px-6 sm:text-[13.5px]">
        {prompt}
      </pre>
    </div>
  );
}
