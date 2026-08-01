import type { ContentBlock } from "./schema";

export interface PromptLibraryPart {
  title?: string;
  blocks: ContentBlock[];
}

export interface PromptLibrarySection {
  id: string;
  title: string;
  parts: PromptLibraryPart[];
}

export interface PromptLibraryGroups {
  intro: ContentBlock[];
  sections: PromptLibrarySection[];
}

export function groupPromptLibraryBlocks(blocks: ContentBlock[]): PromptLibraryGroups {
  const intro: ContentBlock[] = [];
  const sections: PromptLibrarySection[] = [];
  let currentSection: PromptLibrarySection | undefined;
  let currentPart: PromptLibraryPart | undefined;

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      const sectionId = block.id || `section-${sections.length + 1}`;

      if (currentSection?.id === sectionId) {
        currentPart = { title: block.content, blocks: [] };
        currentSection.parts.push(currentPart);
      } else {
        currentSection = {
          id: sectionId,
          title: block.content,
          parts: [{ blocks: [] }],
        };
        currentPart = currentSection.parts[0];
        sections.push(currentSection);
      }

      continue;
    }

    if (currentPart) {
      currentPart.blocks.push(block);
    } else {
      intro.push(block);
    }
  }

  return { intro, sections };
}

export function getPromptBlocks(section: PromptLibrarySection) {
  return section.parts.flatMap((part) =>
    part.blocks.filter((block): block is Extract<ContentBlock, { type: "prompt" }> => block.type === "prompt")
  );
}
