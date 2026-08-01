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
  collapsed?: boolean;
  index: number;
  materialSlug?: string;
}

export default function PromptBlock({
  id,
  title,
  description,
  prompt,
  collapsed,
  index,
  materialSlug,
}: PromptBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(!collapsed);
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
      <div className="border-b border-line/80 bg-paper/70 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="shrink-0 font-mono text-xs font-medium text-lime-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          {title && (
            <h3 className="min-w-0 break-words text-[15px] font-semibold leading-snug text-ink sm:text-base">{title}</h3>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line/70 pt-3">
          {collapsed !== undefined && (
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-expanded={isOpen}
              aria-controls={`prompt-content-${id}`}
              className="btn-ghost h-10 shrink-0 px-3.5 text-sm"
            >
              <svg
                className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{isOpen ? "Свернуть" : "Показать промпт"}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Скопировать промпт${title ? ` «${title}»` : ""}`}
            className={`${copied ? "btn-primary" : "btn-ghost"} h-10 min-w-[142px] shrink-0 px-4 text-sm`}
          >
            {copied ? <IconCheck className="size-[18px]" /> : <IconCopy className="size-[18px]" />}
            <span aria-live="polite">{copied ? "Скопировано" : "Скопировать"}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div id={`prompt-content-${id}`}>
          {description && (
            <p className="border-b border-line/60 px-4 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-5">
              {description}
            </p>
          )}

          <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-5 font-mono text-[13px] leading-[1.75] text-ink/85 sm:px-6 sm:text-[13.5px]">
            {prompt}
          </pre>
        </div>
      )}
    </div>
  );
}
