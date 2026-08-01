import type { ReactNode } from "react";
import type { ContentBlock } from "@/lib/content/schema";
import { formatRichText } from "@/lib/content/rich-text";
import { getPromptBlocks, groupPromptLibraryBlocks, type PromptLibrarySection } from "@/lib/content/prompt-library";
import PromptBlock from "./PromptBlock";
import YouTubeBlock from "./YouTubeBlock";

interface PromptLibraryProps {
  blocks: ContentBlock[];
  materialSlug?: string;
}

const sectionMeta: Record<string, { title: string; description: string }> = {
  vizitki: {
    title: "Визитки",
    description: "Страницы о себе, своих услугах и личном бренде.",
  },
  lendingi: {
    title: "Лендинги",
    description: "Посадочные страницы под услугу, продукт, эфир или запись.",
  },
  instrumenty: {
    title: "Инструменты",
    description: "Полезные штуки, которые считают, отсчитывают и помогают в работе.",
  },
  igry: {
    title: "Мини-игры",
    description: "Квизы, рулетки и игровые механики для экспериментов и вовлечения.",
  },
  otkrytki: {
    title: "Открытки и приглашения",
    description: "Визуальные страницы, которыми хочется поделиться с друзьями.",
  },
  socseti: {
    title: "Соцсети",
    description: "Генераторы, обложки, сторис и другие вещи для блога.",
  },
  styles: {
    title: "Стили",
    description: "12 визуальных направлений и готовый пример для первого запуска.",
  },
};

function fallbackSectionMeta(section: PromptLibrarySection) {
  return {
    title: section.title.replace(/^\d+\.\s*/, ""),
    description: "Готовые промпты для быстрого старта.",
  };
}

function renderSupportBlock(block: ContentBlock, key: string): ReactNode {
  switch (block.type) {
    case "richText":
      return (
        <div
          key={key}
          className="prose prose-invert max-w-none text-[15px] leading-relaxed text-ink-soft sm:text-base"
          dangerouslySetInnerHTML={{ __html: formatRichText(block.content) }}
        />
      );

    case "note":
      return (
        <div
          key={key}
          className="flex gap-3 rounded-xl border border-line bg-milk p-4 text-[14px] leading-relaxed text-ink-soft"
        >
          <svg
            className="mt-0.5 size-4 shrink-0 text-lime-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{block.content}</span>
        </div>
      );

    case "image":
      return (
        <figure key={key} className="my-4">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-2xl border border-line object-cover"
            style={block.aspectRatio ? { aspectRatio: block.aspectRatio } : undefined}
          />
        </figure>
      );

    case "youtube":
      return (
        <div key={key} className="my-4">
          <YouTubeBlock
            videoId={block.videoId}
            title={block.title}
            description={block.description}
            startAt={block.startAt}
          />
        </div>
      );

    case "link":
      return (
        <div key={key} className="my-4">
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-lime-400 hover:bg-lime-100"
          >
            {block.label}
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {block.description && <p className="mt-2 text-[13px] text-ink-soft">{block.description}</p>}
        </div>
      );

    case "divider":
      return <hr key={key} className="my-8 border-line" />;

    default:
      return null;
  }
}

function renderSupportBlocks(blocks: ContentBlock[], keyPrefix: string) {
  return blocks
    .filter((block) => block.type !== "prompt")
    .map((block, index) => renderSupportBlock(block, `${keyPrefix}-${index}`));
}

function PromptLibrarySectionView({
  section,
  sectionIndex,
  totalSections,
  materialSlug,
  promptIndex,
}: {
  section: PromptLibrarySection;
  sectionIndex: number;
  totalSections: number;
  materialSlug?: string;
  promptIndex: { value: number };
}) {
  const promptsCount = getPromptBlocks(section).length;
  const sectionAnchor = `prompt-section-${section.id}`;

  return (
    <section
      id={sectionAnchor}
      aria-labelledby={`${sectionAnchor}-title`}
      className="scroll-mt-24 rounded-[28px] border border-line bg-paper p-5 shadow-[0_24px_56px_-36px_rgba(38,40,31,0.28)] sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="pill border border-line bg-milk px-3 py-1.5 text-[10px] text-ink-faint">
            Раздел {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
          </p>
          <h2
            id={`${sectionAnchor}-title`}
            className="mt-4 max-w-2xl font-display text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl"
          >
            {section.title}
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          {promptsCount} {promptsCount === 1 ? "промпт" : "промптов"}
        </span>
      </div>

      {section.parts.map((part, partIndex) => {
        const prompts = part.blocks.filter(
          (block): block is Extract<ContentBlock, { type: "prompt" }> => block.type === "prompt"
        );

        return (
          <div
            key={`${section.id}-part-${partIndex}`}
            className={partIndex === 0 ? "pt-5" : "mt-8 border-t border-line pt-7"}
          >
            {part.title && (
              <h3 className="font-display text-lg font-medium tracking-[-0.01em] sm:text-xl">{part.title}</h3>
            )}
            <div className={part.title ? "mt-4 space-y-4" : "space-y-4"}>
              {renderSupportBlocks(part.blocks, `${section.id}-part-${partIndex}`)}
            </div>

            {prompts.length > 0 && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {prompts.map((prompt) => (
                  <PromptBlock
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    prompt={prompt.prompt}
                    collapsed={prompt.collapsed}
                    index={promptIndex.value++}
                    materialSlug={materialSlug}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <a
        href="#prompt-library-navigation"
        className="mt-7 inline-flex text-sm font-medium text-lime-700 transition-colors hover:text-ink"
      >
        К разделам ↑
      </a>
    </section>
  );
}

export default function PromptLibrary({ blocks, materialSlug }: PromptLibraryProps) {
  const { intro, sections } = groupPromptLibraryBlocks(blocks);
  const sectionsWithPrompts = sections.filter((section) => getPromptBlocks(section).length > 0);
  const promptIndex = { value: 0 };

  return (
    <div>
      <div className="space-y-4">{renderSupportBlocks(intro, "library-intro")}</div>

      <nav id="prompt-library-navigation" aria-label="Разделы базы промптов" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="pill border border-lime-300/70 bg-lime-100 px-3.5 py-2 text-lime-700">Навигация по базе</p>
            <h2 className="mt-4 font-display text-xl font-medium tracking-[-0.01em] sm:text-2xl">
              Выберите задачу
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Откройте нужный раздел, выберите карточку и скопируйте готовый запрос.
          </p>
        </div>

        <div className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectionsWithPrompts.map((section, index) => {
            const meta = sectionMeta[section.id] || fallbackSectionMeta(section);
            const promptsCount = getPromptBlocks(section).length;

            return (
              <a
                key={section.id}
                href={`#prompt-section-${section.id}`}
                className="group rounded-3xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-[0_22px_46px_-30px_rgba(38,40,31,0.42)] focus-visible:outline-offset-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-lime-700">
                    {promptsCount} {promptsCount === 1 ? "промпт" : "промптов"}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-lime-700">
                      {meta.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{meta.description}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-milk text-ink transition-all duration-300 group-hover:border-lime-500 group-hover:bg-lime-100">
                    <svg className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M12 5v14m-6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="mt-10 space-y-8">
        {sections.map((section, index) => (
          <PromptLibrarySectionView
            key={section.id}
            section={section}
            sectionIndex={index}
            totalSections={sections.length}
            materialSlug={materialSlug}
            promptIndex={promptIndex}
          />
        ))}
      </div>
    </div>
  );
}
