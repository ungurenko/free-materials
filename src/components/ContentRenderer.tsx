import type { ContentBlock } from "@/lib/content/schema";
import { formatRichText } from "@/lib/content/rich-text";
import PromptBlock from "./PromptBlock";
import PromptLibrary from "./PromptLibrary";
import YouTubeBlock from "./YouTubeBlock";

interface ContentRendererProps {
  blocks: ContentBlock[];
  materialSlug?: string;
  layout?: "article" | "promptLibrary";
}

export default function ContentRenderer({ blocks, materialSlug, layout }: ContentRendererProps) {
  if (layout === "promptLibrary") {
    return <PromptLibrary blocks={blocks} materialSlug={materialSlug} />;
  }

  let promptIndex = 0;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "richText":
            return (
              <div
                key={i}
                className="prose prose-invert max-w-none text-[15px] leading-relaxed text-ink-soft sm:text-base"
                dangerouslySetInnerHTML={{ __html: formatRichText(block.content) }}
              />
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  className="mt-12 font-display text-xl font-medium tracking-[-0.01em] sm:text-2xl"
                >
                  {block.content}
                </h2>
              );
            }
            return (
              <h3 key={i} className="mt-8 text-lg font-semibold sm:text-xl">
                {block.content}
              </h3>
            );

          case "image":
            return (
              <figure key={i} className="my-8">
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
              <div key={i} className="my-8">
                <YouTubeBlock
                  videoId={block.videoId}
                  title={block.title}
                  description={block.description}
                  startAt={block.startAt}
                  materialSlug={materialSlug}
                />
              </div>
            );

          case "prompt":
            return (
              <div key={block.id} className="my-6">
                <PromptBlock
                  id={block.id}
                  title={block.title}
                  description={block.description}
                  prompt={block.prompt}
                  collapsed={block.collapsed}
                  index={promptIndex++}
                  materialSlug={materialSlug}
                />
              </div>
            );

          case "link":
            return (
              <div key={i} className="my-6">
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
                {block.description && (
                  <p className="mt-2 text-[13px] text-ink-soft">{block.description}</p>
                )}
              </div>
            );

          case "note":
            return (
              <div
                key={i}
                className="my-4 flex gap-3 rounded-xl border border-line bg-paper p-4 text-[14px] leading-relaxed text-ink-soft"
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

          case "divider":
            return <hr key={i} className="my-10 border-line" />;

          default:
            return null;
        }
      })}
    </>
  );
}
